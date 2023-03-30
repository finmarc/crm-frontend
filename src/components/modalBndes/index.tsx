import { Lucide, Modal, ModalBody } from "@/base-components";
import { useState } from "react";
export default function ModalBndes() {
  const [buttonModalPreview, setButtonModalPreview] = useState(false);
  const [situacao, setSituacao] = useState("");
  const [motivo, setMotivo] = useState("");
  const [tipoApoio, setTipoApoio] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [taxaDesconto, setTaxaDesconto] = useState("");
  const [valorContratado, setValorContratado] = useState("");
  const [prazoOperacao, setPrazoOperacao] = useState("");
  const [garantia, setGarantia] = useState("");
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
              <div className="grid grid-cols-2 gap-1">
                <label htmlFor="regular-form-1" className="form-label">
                  Situação da Proposta
                </label>
                <select
                  className="form-control"
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                >
                  <option value="">Aprovado</option>
                  <option value="">Recusado</option>
                  <option value="">Em-análise</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Motivo
                </label>
                <select
                  className="form-control"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                >
                  <option value="">motivo 1</option>
                  <option value="">motivo 2</option>
                  <option value="">motivo 3</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Tipo Apoio
                </label>
                <select
                  className="form-control"
                  value={tipoApoio}
                  onChange={(e) => setTipoApoio(e.target.value)}
                >
                  <option value="">opção 1</option>
                  <option value="">opção 2</option>
                  <option value="">opção 3</option>
                </select>
                <label htmlFor="regular-form-1" className="form-label">
                  Taxa de Juros
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                />
                <label htmlFor="regular-form-1" className="form-label">
                  Taxa de Desconto
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={taxaDesconto}
                  onChange={(e) => setTaxaDesconto(e.target.value)}
                />
                <label htmlFor="regular-form-1" className="form-label">
                  Valor contratado
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={valorContratado}
                  onChange={(e) => setValorContratado(e.target.value)}
                />
                <label htmlFor="regular-form-1" className="form-label">
                  Prazo operação
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={prazoOperacao}
                  onChange={(e) => setPrazoOperacao(e.target.value)}
                />
                <label htmlFor="regular-form-1" className="form-label">
                  Garantia
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={garantia}
                  onChange={(e) => setGarantia(e.target.value)}
                />
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
