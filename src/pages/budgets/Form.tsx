import React, { useCallback, useEffect, useRef, useState } from "react"
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import classnames from "classnames";
import SelectCustom from "../../components/Inputs/Select";
import InputText from "../../components/Inputs/InputText";
import InputMaskMoney from "../../components/Inputs/InputMaskMoney";
import { Partner, Product, Status, Types } from "./interfaces/budget";
import { Dropdown } from "../../components/Inputs/Dropdown";
import api from "../../services/apiClient";


type Props = {
    initialData?: any
    isDisabled?: boolean,
    handleSubmit: any,
}
const Form: React.FC<Props> = ({ initialData, isDisabled, handleSubmit }) => {
    const formRef = useRef<FormHandles>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [client, setClient] = useState<any>();
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

        setProducts(responseProducts?.data);
        setPartners(responsePartners?.data);
        setStatus(responseStatus?.data);
        setTypes(responseTypes?.data);
    }, []);

    const mapResponseToValuesAndLabels = (data: any) => ({
        value: data.id,
        label: data.name,
    });

    function clientOptions() {
        api.get("/clients").then(response => {
            const clientes = response.data.map(mapResponseToValuesAndLabels)
            setClients(clientes)
        })
    }


    function initialClientOption() {
        const { client } = initialData;
        const data = {
            value: client?.id,
            label: client?.name,
        }
        setClient(data);
    }


    useEffect(() => {
        initialDataSelect()
        clientOptions()
        initialClientOption()
    }, [])



    function handleChange(value: any) {
        setClient(value)
    }

    return (
        <>
            <Unform
                ref={formRef}
                initialData={initialData}
                onSubmit={handleSubmit}
            >

                <InputText
                    type="hidden"
                    name="client_id"
                    classname="first-line:"
                    defaultValue={client?.value}
                />
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
                <div className="mt-3">
                    <Dropdown
                        handleChange={handleChange}
                        options={clients}
                        isDisabled={isDisabled}
                        label="Cliente"
                        defaultValue={client}
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