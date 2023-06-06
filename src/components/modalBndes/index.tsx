import {Modal, ModalBody } from "@/base-components";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiFinmarcBndes } from "../../services/apiClient";
import { toast } from "react-hot-toast";

type Props = {
  setShowModalSendProposal: Function,
  showModalSendProposal: boolean,
  id: string,
  proposals?: any,
}

export interface BNDESProposal {
  idProposta: number;
  idProposal: number;
  situacaoProposta: string;
  tipoApoio?: string;
  taxaJuros?: number;
  taxaDesconto?: number;
  valorContratado?: number;
  prazoOperacao?: number;
  prazoAntecipacao?: number;
  dataContratacao?: string;
  dataSituacaoProposta?: string;
  motivoSituacaoProposta?: string;
  descricaoSituacaoProposta?: string;
  opcaoGarantia?: string[];
}

const EM_ANALISE = "Em análise";
const INICIO_RELACIONAMENTO_FORMAL = "Início relacionamento formal";
const CONTRATADA_COM_LINHAS_PROPRIAS = "Contratada com linhas próprias";
const CONTRATADA_COM_LINHA_BNDES = "Contratada com linha BNDES";
const CONTRATADA_COM_FIDC_BNDES = "Contratada com FIDC BNDES";
const CONTRATADA_BNDES_MICROCREDITO = "Contratada BNDES Microcrédito";
const RECUSADA = "Recusada";
const CANCELADA = "Cancelada";
const EXPIRADA = "Expirada";



const BNDES_STATUS = [
  { value: "EM_ANALISE", label: EM_ANALISE },
  { value: "INICIO_RELACIONAMENTO_FORMAL", label: INICIO_RELACIONAMENTO_FORMAL },
  { value: "CONTRATADA_COM_LINHAS_PROPRIAS", label: CONTRATADA_COM_LINHAS_PROPRIAS },
  { value: "CONTRATADA_COM_LINHA_BNDES", label: CONTRATADA_COM_LINHA_BNDES },
  { value: "CONTRATADA_COM_FIDC_BNDES", label: CONTRATADA_COM_FIDC_BNDES },
  { value: "CONTRATADA_BNDES_MICROCREDITO", label: CONTRATADA_BNDES_MICROCREDITO },
  { value: "RECUSADA", label: RECUSADA },
  { value: "CANCELADA", label: CANCELADA },
  { value: "EXPIRADA", label: EXPIRADA },
];

const MOTIVOS = [
  { value: "NEGATIVA_CREDITO", label: "Negativa Crédito" },
  { value: "FALTA_DOCUMENTACAO_CADASTRO", label: "Falta documnetação ou cadastro" },
  { value: "GARANTIAS_INSUFICIENTE", label: "Garantias Insuficientes" },
  { value: "OUTROS", label: "Outros" },
]

const TIPO_APOIO = [
  { value: "C", label: "Com Garantia Real" },
  { value: "S", label: "Sem Garantia Real" },
  { value: "R", label: " Antecipação de Recebíveis " },
]

const GARANTIAS = [
  { value: "A", label: "AVAL/FIANÇA" },
  { value: "I", label: " IMÓVEL" },
  { value: "V", label: "VEÍCULO" },
  { value: "R", label: "RECEBÍVEIS" },
  { value: "S", label: "SEM GARANTIA" },
  { value: "O", label: "OUTROS" },
]

export default function ModalBndes({ showModalSendProposal, setShowModalSendProposal, proposals , id}: Props) {
  const [proposta, setProposta] = useState<any>();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (Array.isArray(proposals)) {
      const p = proposals.find((proposal: any) => {
        return proposal.id === id;
      });

      setProposta(p);
    }else{
      setProposta(proposals)
    }
  }, [proposals]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {} as BNDESProposal,
  });

  const onSubmit: SubmitHandler<BNDESProposal> = async (data: BNDESProposal) => { 
    try {
      setSending(true);
      const dataSend = {
        ...data,
        taxaJuros: data.taxaJuros ? +data.taxaJuros : 0,
        taxaDesconto: data.taxaDesconto ? +data.taxaDesconto : 0,
        valorContratado: data.valorContratado ? +data.valorContratado : 0,
        prazoOperacao: data.prazoOperacao ? +data.prazoOperacao : 0,
        prazoAntecipacao: data.prazoAntecipacao ? +data.prazoAntecipacao : 0,
        dataContratacao: data.dataContratacao ? new Date(data.dataContratacao).toISOString() : new Date().toISOString(),
        dataSituacaoProposta: data.dataSituacaoProposta ? new Date(data.dataSituacaoProposta).toISOString() : new Date().toISOString(),
        idProposal: +data.idProposal,
        idProposta: +data.idProposta,
        opcaoGarantia: [data.opcaoGarantia],
      }
      await apiFinmarcBndes.post("/proposals/send", dataSend);
      
      toast.success("Proposta enviada com sucesso!");
      setShowModalSendProposal(false);
      setSending(false);
    }catch (error: any) {
      toast.error("Erro ao enviar proposta!");
      setSending(false);
      console.log(error.message);
    }
    
  };


  return (
    <div>
      <Modal
        show={showModalSendProposal}
        onHidden={() => {
          setShowModalSendProposal(false);
        }}
        size="modal-xl"

      >
        <a
          onClick={() => {
            setShowModalSendProposal(false);
          }}
          className="absolute right-0 top-0 mt-3 mr-3"
          href="#"
        ></a>
        <ModalBody className="p-0">
          <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("idProposal")} value={id} />
            {proposta && (<input type="hidden" {...register("idProposta")} value={proposta?.idProposta} />)}

            <div className="p-5">
              <div className="text-xl mt-5">Relatório BNDES</div>
              <div className="text-slate-500 mt-2">
                <div className="grid grid-cols-3 gap-4 pb-2">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Situação Proposta
                    </label>
                    <select
                      {...register("situacaoProposta")}
                      id="situacaoProposta"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecionar...</option>
                      {BNDES_STATUS.map((situacao) => (
                        <option key={situacao.value} value={situacao.value} >{situacao.label}</option>
                      ))}

                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Motivo
                    </label>
                    <select
                      {...register("motivoSituacaoProposta")}
                      id="motivoSituacaoProposta"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecionar...</option>
                      {MOTIVOS.map((motivo) => (
                        <option key={motivo.value} value={motivo.value} >{motivo.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Tipo Apoio
                    </label>
                    <select
                      {...register("tipoApoio")}
                      id="tipoApoio"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecionar...</option>
                      {TIPO_APOIO.map((tipo) => (
                        <option key={tipo.value} value={tipo.value} >{tipo.label}</option>
                      ))}
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
                      {...register("taxaJuros")}
                      type="number"
                      id="taxaJuros"
                      className="form-input rounded-md shadow-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Taxa Desconto
                    </label>
                    <input
                      {...register("taxaDesconto")}
                      type="number"
                      id="taxaDesconto"
                      className="form-input rounded-md shadow-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Valor Contratado
                    </label>
                    <input
                      {...register("valorContratado")}
                      type="number"
                      id="valorContratado"
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
                      {...register("prazoOperacao")}
                      id="prazoOperacao"
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
                      {...register("prazoAntecipacao")}
                      id="prazoAntecipacao"
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
                    {...register("opcaoGarantia")}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="opcaoGarantia"
                  >
                    <option value="" >Selecionar...</option>
                    {GARANTIAS.map((garantia) => (
                      <option key={garantia.value} value={garantia.value} >{garantia.label}</option>
                    ))}
                  </select>
                </div>
                {/* área de descrição */}
                <div className="flex flex-col pt-2">
                  <label className="mb-1 font-bold text-gray-700">
                    Descrição:
                  </label>
                  <textarea
                    {...register("descricaoSituacaoProposta")}
                    id="descricaoSituacaoProposta"
                    className="p-2 border rounded-md resize-y"
                    rows={4}
                    placeholder="Digite aqui"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className=" flex justify-center space-x-4 px-5 pb-8  ">
              <button
                type="button"
                onClick={() => setShowModalSendProposal(false)}
                className="btn btn-danger mt-5 "
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary mt-5">{ sending ? 'Enviando ...': 'Enviar' }</button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
