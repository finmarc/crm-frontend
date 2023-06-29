import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Lucide } from "@/base-components";
import { faker as $f } from "@/utils";
import {apiFinmarcBndes} from "../../services/apiClient";
import ButtonGoBack from "../../components/Button/backto";
import ModalBndes from '../../components/modalBndes'

interface Report {
  id: number
  lead_id: string,
  idProposta: number,
  idProposal: number,
  situacaoProposta: string,
  dataSituacaoProposta: string,
  motivoSituacaoProposta: string,
  tipoApoio: string,
  taxaJuros: string,
  taxaDesconto: string,
  valorContratado: string,
  prazoOperacao: string,
  prazoAntecipacao: string,
  opcaoGarantia: string,
  dataContratacao: string,
  description: string,
  status: boolean,
  user_id?: number,
  updated_by?: string,
  created_at: string,
  updated_at: string
}

interface Proposal {
  idProposta: number,
  cnpj: string,
  cpf: string,
  nome: string,
  mei: boolean,
  cpfEmpresarioIndividual: string,
  dataNascimento: string,
  tempoConstituicao: number,
  cnaePrincipal: string,
  cnaesSecundarios: string,
  cep: string,
  valorFaturamento: string,
  valorFinanciamento: string,
  finalidade: string,
  contatoNome: string,
  contatoEmail: string,
  contatoTelefone: string,
  descricao: string,
  bndes_reports: Report[],
  created_at: string,
}

const BndesLeadsDetailsPF = () => {
  const [proposal, setProposal] = useState<Proposal>();
  const history = useHistory();
  const [showModalSendProposal, setShowModalSendProposal] = useState(false);

  let { id } = useParams<any>();

  const fetchData = useCallback(async () => {
    const response = await apiFinmarcBndes.get(`/proposals/${id}`);
    const { data } = response;
    const newProposal = {
      ...data.data,
    }
    setProposal(newProposal);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Detalhes da Proposta</h2>
        <ButtonGoBack route="/bndes-pf" />
      </div>
      <div className="intro-y box px-5 pt-5 mt-5">
        <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
          <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
          <div className="mt-5">
              <div className="text mt-2">Número da Proposta</div>
              <div className="text-slate-500 mt-2">
                {proposal?.idProposta}
              </div>
              <div className="text mt-2">Nome</div>
              <div className="text-slate-500 mt-1">
                {proposal?.nome}
              </div>
              <div className="text mt-2">CNPJ</div>
              <div className="text-slate-500 mt-1">
                { proposal?.cnpj ? proposal.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : "---"}
              </div>
              <div className="text mt-2">CPF</div>
              <div className="text-slate-500 mt-1">
                { proposal?.cpf ? proposal.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : "---"}
              </div>
              <div className="text mt-2">Valor do Faturamento</div>
              <div className="text-slate-500 mt-1">
                {proposal?.valorFaturamento ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(proposal.valorFaturamento)) : "R$ 0,00"}
              </div>
              <div className="text mt-2">Valor do Financiamento</div>
              <div className="text-slate-500 mt-1">
                {proposal?.valorFinanciamento ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(proposal.valorFinanciamento)) : "R$ 0,00"}
              </div>
              <div className="text mt-2">Nome do Contato</div>
              <div className="text-slate-500 mt-1">
                {proposal?.contatoNome}
              </div>
              <div className="text mt-2">Email</div>
              <div className="text-slate-500 mt-1">
                {proposal?.contatoEmail}
              </div>
              <div className="text mt-2">Telefone</div>
              <div className="text-slate-500 mt-1">
                {proposal?.contatoTelefone}
              </div>
              <div className="text mt-2">Descrição</div>
              <div className="text-slate-500 mt-1">
                {proposal?.descricao}
              </div>
              <div className="text mt-2">Data solicitação</div>
              <div className="text-slate-500 mt-1">
                {proposal?.created_at}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
          {showModalSendProposal && (
              <ModalBndes showModalSendProposal={showModalSendProposal}
                setShowModalSendProposal={() => setShowModalSendProposal(!showModalSendProposal)}
                proposals={proposal}
                id={id}
              />
            )
          }
            <div className="font-medium text-center lg:text-left lg:mt-3">
              Relatórios
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start mt-4 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
              <thead className='bg-gray-100 dark:bg-gray-700'>
                <tr>
                  <th>Situação</th>
                  <th>Data Situação</th>
                </tr>
              </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {
                  proposal?.bndes_reports.map(item => (
                    <tr>
                      <td className='flex justify-center p-4'>{item.situacaoProposta}</td>
                      <td>{new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(item.dataSituacaoProposta))}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
            <div className="mt-8 px-5 pb-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowModalSendProposal(!showModalSendProposal);
                }}
                className="btn btn-primary w-32"
              >
                Novo relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BndesLeadsDetailsPF;
