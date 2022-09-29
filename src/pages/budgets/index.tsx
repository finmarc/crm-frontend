import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Lucide } from "../../base-components";
import { Header } from "../../components/Header";
import ModalDelete from "../../components/modal";
import { Table } from "../../components/Table";
import { THeadRow } from "../../components/Table/Thead";
import api from "../../services/apiClient";
import Budgets from "./interfaces/budget";

export const Budget = () => {
  const [budgets, setBudgets] = useState<Budgets[]>([]);

  const keys = budgets && budgets?.length > 0 ? Object.keys(budgets[0]) : [];
  const history = useHistory();

  const theadTitles = [
   "id", "codigo", "Cliente", "Produto/Serviço", "Parceiro", "Situação", "Tipo"
  ]

  const show = useCallback((id: string) => {
    history.push(`budgets/${id}/visualizar`)
  }, []);

  const edit = useCallback((id: string) => {
    history.push(`orcamento/${id}`)
  }, []);

  const remove = useCallback(async (id: string) => {
    await api.delete(`budgets/${id}`)
    toast.success("Cadastro excluido com sucesso!", {
      duration: 4000,
      position: "top-right",
    });
    listUpdate(id);
    return
  }, []);

  function listUpdate(id: string) {
    const recordsList = budgets?.filter(record => record.id !== id);
    setBudgets(recordsList);
  }

  const fetchData = useCallback(async () => {
    const response = await api.get("/budgets");

    const { data } = response;

    const responseData = data.map((budget: Budgets)=> ({
      id: budget.id,
      codigo: budget.code,
      cliente: budget.client.name,
      produto: budget.product.name,
      parceiro: budget.partner.name,
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
      <Header title="Orcamentos" url="orcamento" action="Adicionar" />
      <div className="intro-y box p-5 mt-5">
        <div className="overflow-x-auto">
          <table className="table">
            <THeadRow records={theadTitles} />
            <tbody>
              {budgets?.length > 0 && (
                budgets.map((column: any, index) => (
                  <tr key={index}>{keys.map((key): any => key !== 'id' && (
                    <td key={key} className="whitespace-nowrap">{column[key]}</td>
                  ))}
                    <td className="whitespace-nowrap ">
                      <button className="btn btn-primary mr-1 mb-2" onClick={() => show(column['id'])}>
                        <Lucide icon="Eye" className="w-5 h-5" />
                      </button>
                      <button className="btn btn-warning mr-1 mb-2" onClick={() => edit(column['id'])}>
                        <Lucide icon="Edit" className="w-5 h-5" />
                      </button>
                      <button className="btn btn-danger mr-1 mb-2" onClick={() => remove(column['id'])}>
                        <Lucide icon="Trash" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

