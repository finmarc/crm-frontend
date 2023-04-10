import { useState, useCallback, useEffect } from "react";
import DataTable from "../../components/Datatable";

import { apiFinmarcBndes } from "../../services/apiClient";
import { Leads } from "./interface/leads";


export const BndsLeads = () => {
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
      field: "valorFaturamento",
      headerName: "Faturamento",
      width: 90,
    },
    {
      field: "valorFinanciamento",
      headerName: "Valor solicitado",
      width: 90,
    },
    {
      field: "contatoNome",
      headerName: "Nome do Contato",
      width: 150,
    },
    {
      field: "contatoEmail",
      headerName: "Email do Contato",
      width: 120,
    },
    {
      field: "contatoTelefone",
      headerName: "Telefone do Contato",
      width: 70,
    },
  ];
  const fetchData = useCallback(async () => {
    const response = await apiFinmarcBndes.get("/proposals");

    const { data } = response?.data;
    const responseData = data.map((lead: Leads) => ({
      id: lead.id,
      idProposta: lead.idProposta,
      nome: lead.nome,
      valorFaturamento: lead.valorFaturamento,
      valorFinanciamento: lead.valorFinanciamento,
      cnpj: lead.cnpj,
      cpf: lead.cpf,
      contatoNome: lead.contatoNome,
      contatoEmail: lead.contatoEmail,
      contatoTelefone: lead.contatoTelefone,
      dataCadastro: lead.created_at,
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
        component="leads"
        url="leads"
        title="Fluxo de Negociação"
        hideButtonDelete={true}
        hideButtonEdit={true}
        hideOrShowButtonSendProposal={true}
      />

    </>
  );
};
