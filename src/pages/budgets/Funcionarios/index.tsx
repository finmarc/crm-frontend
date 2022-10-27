import { useCallback, useEffect, useRef, useState } from "react"
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import api from "../../../services/apiClient";
import SelectCustom from "../../../components/Inputs/Select";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import classNames from "classnames";

import {
    Lucide,
    Modal,
    ModalBody,
} from "@/base-components";

function FormFuncionario(){
    
    const formRef = useRef<FormHandles>(null);
    const { id: budgetId } = useParams<any>();
    const [users, setUsers] = useState<any[]>([]);
    const [userId, setUserId] = useState<any>();
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [observationValue, setObservationValue] = useState("")
    const [idBudget, setBudgetId] = useState("")
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const initialDataSelect = useCallback(async () => {
        const responseUsers = await api.get("/users");
        const responseEmployees = await api.get(`/budget/employees/${budgetId}`);
        setFuncionarios(responseEmployees?.data)
        setUsers(responseUsers?.data);
    }, []);


    const remove = useCallback(async (id: string) => {
        await api.delete(`/budget/employees/${id}`)
        setDeleteConfirmationModal(false);
        toast.success("Funcionário excluido com sucesso!", {
            duration: 4000,
            position: "top-right",
        });
        atualizaListaFuncionario(id);
    }, []);

    function atualizaListaFuncionario(id: string) {
        const recordsList = funcionarios?.filter(funcionario => funcionario.id !== id);
        setFuncionarios(recordsList);
    }


    useEffect(() => {
        initialDataSelect()
        setObservationValue(observationValue);
        setFuncionarios(funcionarios);
    }, [observationValue, funcionarios])

    async function handleFuncionarioAdd() {
        const response = await api.get(`users/${userId}`);

        const { name, id, role } = response.data

        const data = {
            id,
            user: {
                id,
                name,
                role
            }
        }
        

        setFuncionarios(prevItem => [...prevItem, data])

        await api.post(`budget/employees`, {
            budget_id: budgetId,
            user_id: userId
        });
    }
    return (
        <>
            <Form
                ref={formRef}
                onSubmit={()=>{}}
            >
                <div className="flex items-stretch	">
                    <div className="flex-auto w-64 mr-3">
                        <SelectCustom
                            className={classNames({
                                "form-control": true,
                            })}
                            label="Funcionário"
                            name="user_id"
                            onChange={e => setUserId(e.target.value)}
                            options={users}
                        />
                    </div>
                    {<a
                        className="btn btn-primary h-10 mt-7"
                        onClick={handleFuncionarioAdd}
                    >
                        Adicionar
                    </a>}
                </div>

            </Form>

            <div className="mt-4">
                <hr />
                {funcionarios.length == 0 && (
                    <div className="flex items-center justify-center mt-3">
                        <p>Nenhum funcionário vinculado ao orçamento</p>
                    </div>
                )}

                {
                    funcionarios.length > 0 && (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Nome
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Perfil
                                    </th>
                                    <th scope="col" className=" whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Ações</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {funcionarios.map((funcionario) => (
                                    <tr key={funcionario?.user?.id}>

                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {funcionario.user.name}
                                        </td> <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {funcionario.user.role.name}
                                        </td>

                                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a onClick={() => { setBudgetId(funcionario.id),setDeleteConfirmationModal(true) }}  className="text-indigo-600 hover:text-indigo-900">
                                                <Lucide icon="Trash" className="w-5 h-5 text-red-700" /><span className="sr-only">, {funcionario.user.id}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    )
                }

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
                            <button type="button" className="btn btn-danger w-24" onClick={() => remove(idBudget)}>
                                Delete
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
}

export default FormFuncionario