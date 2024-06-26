import { useState, useCallback, useEffect } from "react";
import DataTable from "../../components/Datatable";

import { apiFinmarcBndesOld } from "../../services/apiClient";
import { Leads } from "./interface/leads";


export const BndsLeadsOld = () => {
  const [leads, setLeads] = useState<Leads[]>([]);

  const columns = [
    {
      field: "idProposta",
      headerName: "Proposta",
      width: 80,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 150,
    },
    {
      field: "cnpj",
      headerName: "CNPJ",
      width: 150,
    },
    {
      field: "situacaoProposta",
      headerName: "Situação",
      width: 150,
    },
    {
      field: "contatoNome",
      headerName: "Nome do Contato",
      width: 150,
    },
    {
      field: "contatoTelefone",
      headerName: "Telefone",
      width: 120,
    },
    {
      field: "dataCadastro",
      headerName: "Data cadastro",
      width: 130,
    },
  ];
  const fetchData = useCallback(async () => {
    const response = await apiFinmarcBndesOld.get("/proposals");

    const { data } = response?.data;
    const responseData = data.map((lead: Leads) => ({
      id: lead.id,
      idProposta: lead.idProposta,
      nome: lead.nome,
      valorFaturamento: lead!.valorFaturamento || 0,
      valorFinanciamento: lead!.valorFinanciamento || 0,
      cnpj: lead?.cnpj,
      cpf: lead?.cpf,
      contatoNome: lead?.contatoNome,
      contatoEmail: lead?.contatoEmail,
      contatoTelefone: lead?.contatoTelefone,
      dataCadastro: lead?.created_at,
      situacaoProposta: lead?.bndes_reports?.length ? lead.bndes_reports[lead.bndes_reports.length - 1]?.situacaoProposta : "PENDENTE",
    }));

    setLeads(responseData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <DataTable
        rows={leads}
        columns={columns}
        component="leads-old"
        url="leads-old"
        title="Fluxo de Negociação"
        hideButtonView={false}
        hideButtonDelete={true}
        hideButtonEdit={true}
        hideButtonModalViewProposal={true}
        hideOrShowButtonSendProposal={false}
      />

    </>
  );
};
