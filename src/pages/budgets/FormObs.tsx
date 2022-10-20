import React, { useEffect, useRef, useState } from "react"
import { Form as Unform } from "@unform/web";
import { FormHandles } from "@unform/core";
import api from "../../services/apiClient";
import { ClassicEditor } from "@/base-components";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
type Props = {
    initialData?: string
    isDisabled?: boolean,
}
const FormObservacao: React.FC<Props> = ({ initialData, isDisabled }) => {
    const formRef = useRef<FormHandles>(null);
    const { id } = useParams<any>();
    const [observationValue, setObservationValue] = useState("")

    useEffect(()=>{
        setObservationValue(observationValue)
    }, [observationValue])

    // if(){

    // }

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
            <Unform
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className="input-form mt-3">
                    <ClassicEditor
                        disabled={isDisabled}
                        name="observation"
                        value={initialData || observationValue}
                        onChange={setObservationValue}
                        placeholder="Observações"
                    />
                </div>
                {!isDisabled && (<button
                    type="submit"
                    className="btn btn-primary mt-5"
                >
                    Salvar observação
                </button>)}
            </Unform>
        </>
    );
}

export default FormObservacao