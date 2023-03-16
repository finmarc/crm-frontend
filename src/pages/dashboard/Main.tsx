import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/apiClient";

function Main() {
  const [countBudgets, setCountBudgets] = useState<number>(0);
  const [countBndes, setCountBndes] = useState<number>(0);
  const [countPartners, setCountPartners] = useState<number>(0);
  const [countFinmarc, setCountFinmarc] = useState<number>(0);
  const [countOrcamentosAprovados, setCountOrcamentosAprovados] =
    useState<number>(0);
  const [countOrcamentosEmAtendimento, setCountOrcamentosEmAtendimento] =
    useState<number>(0);
  const [countOrcamentosReprovados, setCountOrcamentosReprovados] =
    useState<number>(0);
  const [
    countOrcamentosAguardandoAprovacao,
    setCountOrcamentosAguardandoAprovacao,
  ] = useState<number>(0);
  const [countClients, setCountClients] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const response = await api.get("/budgets");
    const partners = await api.get("/partners");
    const clients = await api.get("/clients");
    setCountBudgets(response.data.length);
    setCountPartners(partners.data.length);
    setCountClients(clients.data.length);

    const finmarcCounts = response.data.filter(
      (item: any) => item?.partner?.name == 'Finmarc Direto'
    );

    setCountFinmarc(finmarcCounts.length);

    const orcamentosAprovados = response.data.filter(
      (item: any) => item?.status?.name === "Aprovado"
    );
    setCountOrcamentosAprovados(orcamentosAprovados.length);
    const orcamentosReprovados = response.data.filter(
      (item: any) => item?.status?.name === "Reprovado"
    );
    setCountOrcamentosReprovados(orcamentosReprovados.length);
    const orcamentosAguardandoAprovacao = response.data.filter(
      (item: any) => item?.status?.name === "Aguardando Aprovação"
    );
    setCountOrcamentosAguardandoAprovacao(orcamentosAguardandoAprovacao.length);
    const orcamentosEmAtendimento = response.data.filter(
      (item: any) => item?.status?.name === "Em atendimento"
    );
    setCountOrcamentosEmAtendimento(orcamentosEmAtendimento.length);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { id: 1, name: "Orçamentos", stat: countBudgets, route: "/orcamentos" },
    {
      id: 2,
      name: "Aprovados",
      stat: countOrcamentosAprovados,
      route: "/orcamentos?tipo=Aprovado",
    },
    {
      id: 3,
      name: "Reprovados",
      stat: countOrcamentosReprovados,
      route: "/orcamentos?tipo=Reprovado",
    },
    {
      id: 4,
      name: "Aguardando Aprovação",
      stat: countOrcamentosAguardandoAprovacao,
      route: "/orcamentos?tipo=Aguardando Aprovação",
    },
    {
      id: 5,
      name: "Em Atendimento",
      stat: countOrcamentosEmAtendimento,
      route: "/orcamentos?tipo=Em atendimento",
    },
    { id: 6, name: "Clientes", stat: countClients, route: "/clientes" },
    { id: 7, name: "Paceiros", stat: countPartners, route: "/parceiros" },
    { id: 8, name: "BNDES Leads", stat: countBndes, route: "/" },
    { id: 9, name: "Finmarc Direto", stat: countFinmarc, route: "/orcamentos?tipo=finmarc"},
  ];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Painel Administrativo</h2>
      </div>

      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <Link to={item.route}>
              <div
                key={item.name}
                className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-gray-500">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            </Link>
          ))}
        </dl>
      </div>
    </>
  );
}

export default Main;
