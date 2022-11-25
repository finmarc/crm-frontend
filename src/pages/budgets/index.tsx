import { useCallback, useEffect, useState } from "react";
import api from "../../services/apiClient";
import Budgets from "./interfaces/budget";
import DataTable from "../../components/Datatable";

export const Budget = () => {
  const [budgets, setBudgets] = useState<Budgets[]>([]);
  const columns = [
    {
      field: "codigo",
      headerName: "Código",
      width: 150,
    },
    {
      field: "cliente",
      headerName: "Cliente",
      width: 180,
    },
    {
      field: "produto",
      headerName: "Produto/Serviço",
      width: 150,
    },
    {
      field: "parceiro",
      headerName: "Parceiro",
      width: 150,
    },
    {
      field: "situacao",
      headerName: "Situação",
      width: 150,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 150,
    },
  ]

  const fetchData = useCallback(async () => {
    const response = await api.get("/budgets");

    const { data } = response;

    const responseData = data.map((budget: Budgets)=> ({
      id: budget.id,
      codigo: budget.code,
      cliente: budget.client.name,
      produto: budget.product.name,
      parceiro: budget.partner?.name,
      situacao: budget.status.name,
      tipo: budget.type.name
    }))

    setBudgets(responseData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <DataTable rows={budgets} columns={columns} component="orcamento" url="budgets" />
    </>
  );
};

