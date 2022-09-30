import React, { useCallback, useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { cep, cpf, currency, formatCurrencyBR } from "./masks";

interface Props {
    name: string;
    label?: string;
    mask: "cep" | "currency" | "cpf";
    classname: any;
    disabled?: boolean;
    placeholder?: string;
}
const InputMaskMoney: React.FC<Props> = ({ name, label, placeholder, classname, disabled,mask, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = "", registerField, error } = useField(name);

    const handleKeyUp = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            if (mask === "cep") {
                cep(e);
            }
            if (mask === "currency") {
                currency(e);
            }
            if (mask === "cpf") {
                cpf(e);
            }
        },
        [mask]
    );

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        });
    }, [fieldName, registerField]);

    const valueFomatted = formatCurrencyBR(defaultValue)

    return (
        <>
            {label && <label htmlFor={fieldName} className="form-label w-full flex flex-col sm:flex-row">{label}</label>}

            <input
                className={`form-control ${error && 'border-danger'}`}
                type="text"
                disabled={disabled}
                placeholder={placeholder}
                ref={inputRef}
                id={fieldName}
                onKeyUp={handleKeyUp}
                defaultValue={valueFomatted}
                {...rest}
            />
            {error && <div className="text-danger mt-2">{error}</div>}
        </>
    );
}

export default InputMaskMoney;
