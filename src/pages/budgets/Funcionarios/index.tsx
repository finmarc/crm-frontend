import React, { useCallback, useEffect, useRef, useState } from "react"
import { Form  } from "@unform/web";
import { FormHandles } from "@unform/core";
import api from "../../../services/apiClient";
import SelectCustom from "../../../components/Inputs/Select";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import classNames from "classnames";
type Props = {
    initialData?: string
    isDisabled?: boolean,
}
const FormFuncionario: React.FC<Props> = ({ initialData, isDisabled }) => {
    const [funcionarios, setFuncionarios] = useState<any[]>([]);
    const [observationValue, setObservationValue] = useState("")

    const formRef = useRef<FormHandles>(null);
    const { id } = useParams<any>();

    const initialDataSelect = useCallback(async () => {
        const responseUsers = await api.get("/users");
        setFuncionarios(responseUsers?.data);

    }, []);
    useEffect(() => {
        initialDataSelect()
        setObservationValue(observationValue)
    }, [observationValue])

    const handleSubmit = async () => {
        const response = await api.patch(`budgets/${id}`, {
            observation: observationValue
        });
        const { status } = response;
        if (status == 200) {
            toast.success("Atualizado  com sucesso!", {
                duration: 4000,
                position: "top-right",
            });
        } else {
            toast.error("Ops! Algo deu errado", {
                duration: 4000,
                position: "top-right",
            });
        }
    };
    return (
        <>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className="input-form mt-3">
                    <SelectCustom
                        disabled={isDisabled}
                        className={classNames({
                            "form-control": true,
                        })}
                        label="Funcionário"
                        name="user_id"
                        options={funcionarios}
                    />
                </div>
                {!isDisabled && (<button
                    type="submit"
                    className="btn btn-primary mt-5"
                >
                    Salvar funcionário
                </button>)}
            </Form>
        </>
    );
}

export default FormFuncionario