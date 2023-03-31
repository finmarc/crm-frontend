import { useState, useCallback, useEffect } from "react";
import DataTable from "../../components/Datatable";

import api from "../../services/apiClient";
import { ModalBody } from "../../base-components";
import ModalBndes from "../../components/modalBndes";

interface Leads {
  id?: string;
  document: string;
  nome: string;
}

export const BndsLeads = () => {
  const [leads, setLeads] = useState<Leads[]>([]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "document",
      headerName: "CPF/CNPJ",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 180,
    },

    {
      field: "priority",
      headerName: "Prioridade",
      width: 150,
    },
    {
      field: "updated",
      headerName: "Atualizado em",
      width: 150,
    },
  ];
  const fetchData = useCallback(async () => {
    const response = await api.get("/leads");

    const { data } = response;

    const responseData = data.map((lead: Leads) => ({
      id: lead.id,
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
      />

      <ModalBndes />
    </>
  );
};
