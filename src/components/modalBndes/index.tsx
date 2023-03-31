import { Lucide, Modal, ModalBody } from "@/base-components";
import { useState } from "react";
export default function ModalBndes() {
  const [buttonModalPreview, setButtonModalPreview] = useState(false);

  return (
    <div>
      <div className="text-center">
        <a
          href="#"
          onClick={() => {
            setButtonModalPreview(true);
          }}
          className="btn btn-primary"
        >
          Criar
        </a>
      </div>
      <Modal
        show={buttonModalPreview}
        onHidden={() => {
          setButtonModalPreview(false);
        }}
      >
        <a
          onClick={() => {
            setButtonModalPreview(false);
          }}
          className="absolute right-0 top-0 mt-3 mr-3"
          href="#"
        ></a>
        <ModalBody className=" p-0">
          <div className="p-5 text-center">
            <div className="text-xl mt-5">Relatório BNDES</div>
            <div className="text-slate-500 mt-2">
              {/* inico */}
              {/* coluna 1 */}
              <div className="grid grid-cols-3 gap-4 pb-2">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Situação Proposta
                  </label>
                  <select
                    id="select-1"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Selecionar...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Motivo
                  </label>
                  <select
                    id="select-2"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Selecionar...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Tipo Apoio
                  </label>
                  <select
                    id="select-2"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Selecionar...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
              {/* coluna 2 */}
              <div className="grid grid-cols-3 gap-4 pb-2">
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Taxa Juros
                  </label>
                  <input
                    type="number"
                    id="input-1"
                    className="form-input rounded-md shadow-sm w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Taxa Desconto
                  </label>
                  <input
                    type="number"
                    id="input-2"
                    className="form-input rounded-md shadow-sm w-full"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Valor Contratado
                  </label>
                  <input
                    type="number"
                    id="input-3"
                    className="form-input rounded-md shadow-sm w-full"
                  />
                </div>
              </div>
              {/* Coluna 3  */}
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div>
                  <label
                    htmlFor="input-1"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Prazo de operação
                  </label>
                  <input
                    id="input-1"
                    type="text"
                    className="form-input rounded-md shadow-sm w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="input-2"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Prazo de Antecipação
                  </label>
                  <input
                    id="input-2"
                    type="text"
                    className="form-input rounded-md shadow-sm w-full"
                  />
                </div>
              </div>
              {/* coluna 4 */}
              <div className="w-full pt-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Garantias
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="select-multiple"
                >
                  <option>Opção 1</option>
                  <option>Opção 2</option>
                  <option>Opção 3</option>
                  <option>Opção 4</option>
                </select>
              </div>
              {/* área de descrição */}
              <div className="flex flex-col pt-2">
                <label className="mb-1 font-bold text-gray-700">
                  Descrição:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="p-2 border rounded-md resize-y"
                  rows="4"
                  placeholder="Digite aqui"
                ></textarea>
              </div>

              {/* fim */}
            </div>
          </div>
          <div className=" flex justify-center space-x-4 px-5 pb-8  ">
            <button
              type="button"
              onClick={() => {
                setButtonModalPreview(false);
              }}
              className="btn btn-danger mt-5 "
            >
              Cancelar
            </button>
            <button className="btn btn-primary mt-5">Salvar</button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
