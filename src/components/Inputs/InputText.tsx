import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface Props {
    name: string;
    label?:string;
    classname: any;
    disabled?: boolean;
    placeholder?:string;
}
const InputText: React.FC<Props> = ({ name, label, placeholder, classname, disabled,...rest }) => {
    const inputRef = useRef(null);

    const { fieldName, defaultValue = "", registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        });
    }, [fieldName, registerField]);
    return (
        <>
            {label && <label htmlFor={fieldName} className="form-label w-full flex flex-col sm:flex-row">{label}</label>}

            <input
                className="form-control"
                type="text"
                disabled={disabled}
                placeholder={placeholder}
                ref={inputRef}
                id={fieldName}
                defaultValue={defaultValue}
                {...rest}
            />

            {error && <span style={{ color: "#f00" }}>{error}</span>}
        </>
    );
}

export default InputText;
