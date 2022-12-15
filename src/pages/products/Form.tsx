import { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import api from "../../services/apiClient";
import SelectCustom from "../../components/Inputs/Select";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import classNames from "classnames";
import { Form as Unform } from "@unform/web";
import { Lucide, Modal, ModalBody } from "@/base-components";
import InputText from "../../components/Inputs/InputText";

export interface DocumentType {
    id: number;
    name: string;
}

export interface Type {
    id: string;
    documentType: DocumentType;
}

export interface Product {
    id: string;
    name: string;
    types: Type[];
}

type Props = {
    product?: Product,
    title?: string,
}
function Form({ product, title }: Props) {
    const formRef = useRef<FormHandles>(null);
    const [documentTypes, setDocumentTypes] = useState<any[]>([]);
    const [types, setTypes] = useState<any[]>([]);
    const [idTypes, setIdTypes] = useState<any[]>([]);
    const [observationValue, setObservationValue] = useState("");
    const [documentTypeId, setDocumentTypeId] = useState("");
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const isDisabled = location.pathname.includes("visualizar");
    const history = useHistory();


    const initialDataSelect = useCallback(async () => {
        const documentTypes = await api.get("/document-types");
        setDocumentTypes(documentTypes?.data);
        if (product && product?.types.length > 0) {
            const productTypes = product.types.map(type => ({
                productTypeId: type.id,
                id: type.documentType.id,
                name: type.documentType.name,
            }))
            productTypes.forEach(productType => {
                setIdTypes(prevItems => [...prevItems, productType.id.toString()])
            })
            setTypes(productTypes)
        }
    }, []);

    useEffect(() => {
        initialDataSelect();
        setObservationValue(observationValue);
    }, [observationValue]);

    const remove = async () => {
        if (product && product.id) {
            await api.post(`/product/types/remove`, { product_id: product?.id, document_type_id: documentTypeId });
            toast.success("Documento excluído com sucesso!", {
                duration: 4000,
                position: "top-right",
            });
        }

        const result = types.filter(type => (type.id !== documentTypeId));
        const idTypesResult = idTypes.filter(type => (type !== documentTypeId));
        setIdTypes(idTypesResult);
        setTypes(result);
        setDeleteConfirmationModal(false);
    };

    const handleChange = async (event: any) => {
        const id = event.target.value;
        const idTypeAlreadyExists = idTypes.find(type => (type === id));

        if (idTypeAlreadyExists) {
            return;
        }

        if (product && product.id) {
            await api.patch(`products/${product.id}`, { document_types: [+id] });
        }
        setIdTypes(prevItems => [...prevItems, id])

        const data = documentTypes.find(data => data.id == id)
        setTypes(prevItems => [...prevItems, data]);

    };

    async function handleSubmit(data: any) {
        if (!data.name) {
            toast.error("Nome do produto obrigatório", {
                duration: 4000,
                position: "top-right",
            });
            return;
        }

        data = {
            name: data.name,
            document_types: idTypes.length > 0 ? idTypes.map(type => parseInt(type)) : []
        }

        let response;

        if (product && product.id) {
            response = await api.patch(`products/${product.id}`, { name: data.name });
        } else {
            response = await api.post("products", data);
        }

        const { status } = response;
        if (status == 200) {
            toast.success("Cadastro atualizado com sucesso!", {
                duration: 4000,
                position: "top-right",
            });
            history.push("/produtos");
        } else if (status == 201) {
            toast.success("Cadastro realizado com sucesso!", {
                duration: 4000,
                position: "top-right",
            });
            history.push("/produtos");
        } else {
            toast.error("Ops! Algo deu errado", {
                duration: 4000,
                position: "top-right",
            });
        }
    }
    return (
        <>
            <Unform ref={formRef} onSubmit={handleSubmit} initialData={product}>
                <div className="grid grid-cols-12 gap-2">
                    <div className="input-form col-span-6">
                        <InputText
                            name="name"
                            label="Nome"
                            placeholder="Nome do produto"
                            classname="form-control"
                            disabled={isDisabled}
                            required
                        />
                    </div>
                    <div className="input-form col-span-6">
                        <SelectCustom
                            className={classNames({
                                "form-control": true,
                            })}
                            label="Tipo de Documento"
                            name="document_type_id"
                            onChange={(e) => { handleChange(e) }}
                            options={documentTypes}
                            disabled={isDisabled}
                        />
                    </div>
                    {!isDisabled && <button
                        type="submit"
                        className="btn btn-primary mt-1"
                    >
                        Salvar
                    </button>}
                </div>
            </Unform>

            <div className="mt-4">
                <hr />
                {types.length == 0 && (
                    <div className="flex items-center justify-center mt-3">
                        <p>Nenhum documento vinculado ao produto</p>
                    </div>
                )}

                {types.length > 0 && (
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
                                    className=" whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                                >
                                    <span className="sr-only">Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {types.map((type) => (
                                <tr key={type?.id}>
                                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                        {type?.name}
                                    </td>{" "}

                                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        {!isDisabled && <a
                                            onClick={() => {
                                                setDeleteConfirmationModal(true),
                                                    setDocumentTypeId(type?.id);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Lucide icon="Trash" className="w-5 h-5 text-red-700" />
                                            <span className="sr-only">{type?.id}</span>
                                        </a>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

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
                                Você realmente deseja excluir esse registro?
                                <br />
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
                            <button
                                type="button"
                                className="btn btn-danger w-24"
                                onClick={() => remove()}
                            >
                                Delete
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </>
    );
}

export default Form;
