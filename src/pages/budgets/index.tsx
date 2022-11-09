import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import { Header } from "../../components/Header";
import { THeadRow } from "../../components/Table/Thead";
import api from "../../services/apiClient";
import Budgets from "./interfaces/budget";

export const Budget = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [budgets, setBudgets] = useState<Budgets[]>([]);
  const [budgetId, setBudgetId] = useState("");
  const keys = budgets && budgets?.length > 0 ? Object.keys(budgets[0]) : [];
  const history = useHistory();

  const theadTitles = [
   "id", "codigo", "Cliente", "Produto/Serviço", "Parceiro", "Situação", "Tipo"
  ]

  const show = useCallback((id: string) => {
    history.push(`orcamento/${id}/visualizar`)
  }, []);

  const edit = useCallback((id: string) => {
    history.push(`orcamento/${id}`)
  }, []);

  const remove = useCallback(async (id: string) => {
    await api.delete(`budgets/${id}`)
    setDeleteConfirmationModal(false)
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
      <Header title="Orçamentos" url="orcamento" action="Adicionar" />
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
                      <button className="btn btn-danger mr-1 mb-2" onClick={() => {setBudgetId(column['id']), setDeleteConfirmationModal(true)}}>
                        <Lucide icon="Trash" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>
        <Modal
          show={deleteConfirmationModal}
          onHidden={() => {
            setDeleteConfirmationModal(false);
          }}
        >
          <ModalBody className="p-0">
            <div className="p-5 text-center">
              <Lucide
                icon="XCircle"
                className="w-16 h-16 text-danger mx-auto mt-3"
              />
              <div className="text-3xl mt-5">Tem certeza ?</div>
              <div className="text-slate-500 mt-2">
                Você realmente deseja excluir esse registro?<br />
                Este processo não pode ser desfeito.
              </div>
            </div>
            <div className="px-5 pb-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmationModal(false);
                }}
                className="btn btn-outline-secondary w-24 mr-1"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger w-24" onClick={() => remove(budgetId)}>
                Delete
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

