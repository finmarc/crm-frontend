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
              <div className="columns-2">
                <label htmlFor="regular-form-1 " className="form-label">
                  Situação da Proposta
                </label>
                <select className="form-control">
                  <option value="">Aprovado</option>
                  <option value="">Recusado</option>
                  <option value="">Em-análise</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Motivo
                </label>
                <select className="form-control">
                  <option value="">motivo 1</option>
                  <option value="">motivo 2</option>
                  <option value="">motivo 3</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Tipo Apoio
                </label>
                <select className="form-control">
                  <option value="">opção 1</option>
                  <option value="">opção 2</option>
                  <option value="">opção 3</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Taxa de Juros
                </label>
                <select className="form-control">
                  <option value="">motivo 1</option>
                  <option value="">motivo 2</option>
                  <option value="">motivo 3</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Taxa de Desconto
                </label>
                <input className="form-control" type="number" />
                <label htmlFor="regular-form-1" className="form-label">
                  Valor contratado
                </label>
                <input className="form-control" type="number" />
                <label htmlFor="regular-form-1" className="form-label">
                  Prazo operçaão
                </label>
                <input className="form-control" type="number" />
                <label htmlFor="regular-form-1" className="form-label">
                  Garantia
                </label>
                <input className="form-control" type="text"></input>
              </div>

              {/* fim */}
            </div>
          </div>
          <div className=" flex space-x-4 px-5 pb-8  ">
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
