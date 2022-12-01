import { useCallback, useEffect, useState } from 'react';
import api from '../../services/apiClient';

function Main() {

  const [countBudgets, setCountBudgets] = useState<number>(0);
  const [countBndes, setCountBndes] = useState<number>(0);
  const [countPartners, setCountPartners] = useState<number>(0);
  const fetchData = useCallback(async () => {
    const response = await api.get("/budgets");
    const partners = await api.get("/partners");
    setCountBudgets(response.data.length);
    setCountPartners(partners.data.length);
  }, []);

  useEffect(() => {
    fetchData()
  }, []);

  const stats = [
    { id: 1, name: 'Orçamentos', stat: countBudgets },
    { id: 2, name: 'Parceiros', stat: countPartners },
    { id: 3, name: 'Propostas BNDES', stat: countBndes},
  ]

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (

    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Painel Administrativo</h2>
      </div>
    
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    


    </>
  );
}

export default Main;
