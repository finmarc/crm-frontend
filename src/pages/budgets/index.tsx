import { useCallback, useEffect, useState } from "react";
import api from "../../services/apiClient";
import Budgets from "./interfaces/budget";
import DataTable from "../../components/Datatable";

export const Budget = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);

  const invitation = params.get("tipo") || "";
  const [budgets, setBudgets] = useState<Budgets[]>([]);
  const columns = [
    {
      field: "codigo",
      headerName: "Código",
      width: 60,
    },
    {
      field: "cliente",
      headerName: "Cliente",
      width: 180,
    },
    {
      field: "produto",
      headerName: "Produto/Serviço",
      width: 260,
    },
    {
      field: "parceiro",
      headerName: "Parceiro",
      width: 150,
    },
    {
      field: "situacao",
      headerName: "Situação",
      width: 180,
      route: "/aprovados",
    },
    {
      field: "responsavel",
      headerName: "Consultor(a)",
      width: 150,
    },
    {
      field: "data",
      headerName: "Data cadastro",
      width: 150,
    },
  ];

  const fetchData = useCallback(async () => {
    const response = await api.get("/budgets");
    const { data } = response;
    let responseData = data.map((budget: Budgets) => ({
      id: budget.id,
      codigo: budget.code,
      cliente: budget.client.name,
      produto: budget.product.name,
      parceiro: budget.partner?.name,
      situacao: budget.status?.name,
      responsavel: budget?.user?.name,
      data:Intl.DateTimeFormat("pt-BR").format( new Date(budget.created_at)),
    }));
    if (invitation === "finmarc") {
      responseData = responseData.filter((d: any) => d.parceiro == "Finmarc Direto");
    }

    if (invitation === "") {
    } else if (invitation !== "finmarc") {
      responseData = responseData.filter((d: any) => d.situacao === invitation);
    }
    setBudgets(responseData);
  }, [invitation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataTable
      rows={budgets}
      columns={columns}
      component="orcamento"
      title="ORÇAMENTOS"
      url="budgets"
    />
  );
};
