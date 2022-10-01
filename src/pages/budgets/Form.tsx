import React, { useCallback, useEffect, useRef, useState } from "react"
import { Form as Unform } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";
import classnames from "classnames";
import SelectCustom from "../../components/Inputs/Select";
import InputText from "../../components/Inputs/InputText";
import TextArea from "../../components/Inputs/TextArea";
import InputMaskMoney from "../../components/Inputs/InputMaskMoney";
import { Client, Partner, Product, Status, Types } from "./interfaces/budget";
import api from "../../services/apiClient";

type Props = {
    initialData?: any
    isDisabled?: boolean,
    handleSubmit: any,
}
const Form: React.FC<Props> = ({ initialData, isDisabled, handleSubmit}) => {
    const formRef = useRef<FormHandles>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [types, setTypes] = useState<Types[]>([]);

    const initialDataSelect = useCallback(async () => {
        const responseClients = await api.get("/clients");
        const responseProducts = await api.get("/products");
        const responsePartners = await api.get("/partners");
        const responseStatus = await api.get("/budget/status");
        const responseTypes = await api.get("/budget/types");

        setClients(responseClients?.data);
        setProducts(responseProducts?.data);
        setPartners(responsePartners?.data);
        setStatus(responseStatus?.data);
        setTypes(responseTypes?.data);
    }, []);

    useEffect(() => {
        initialDataSelect()
    }, [])

    return (
        <>
            <Unform
                ref={formRef}
                initialData={initialData}
                onSubmit={handleSubmit}
            >
                <div className="input-form">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classnames({
                            "form-control": true,
                        })}
                        label="Tipo de serviço"
                        name="type_id"
                        options={types}
                    />
                </div>
                <div className="input-form mt-3">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classnames({
                            "form-control": true,
                        })}
                        label="Cliente"
                        name="client_id"
                        options={clients}
                    />
                </div>

                <div className="input-form mt-3">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classnames({
                            "form-control": true,
                        })}
                        label="Produto/Serviço"
                        name="product_id"
                        options={products}
                    />
                </div>
                <div className="input-form mt-3">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classnames({
                            "form-control": true,
                        })}
                        label="Parceiro"
                        name="partner_id"
                        options={partners}
                    />
                </div>
                <div className="input-form mt-3">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classnames({
                            "form-control": true,
                        })}
                        label="Situação"
                        name="status_id"
                        options={status}
                    />
                </div>
                <div className="input-form mt-3">
                    <InputMaskMoney
                        disabled={isDisabled}
                        mask="currency"
                        name="amount_loan"
                        label="Valor do empréstimo"
                        placeholder="0,00"
                        classname="form-control"
                    />
                </div>
                <div className="input-form mt-3">
                    <InputText
                        name="description"
                        disabled={isDisabled}
                        label="Descrição"
                        placeholder="Decrição"
                        classname="form-control"
                    />
                </div>
                <div className="input-form mt-3">
                    <TextArea
                        disabled={isDisabled}
                        name="observation"
                        label="Observações"
                        placeholder="Observações"
                        classname="form-control"
                    />
                </div>
                {!isDisabled && (<button
                    type="submit"
                    className="btn btn-primary mt-5"
                >
                    Salvar
                </button>)}
            </Unform>
        </>
    );
}

export default Form