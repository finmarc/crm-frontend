import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface Props {
    name: string;
    label?:string;
    classname: any;
    placeholder?:string;
}
const TextArea: React.FC<Props> = ({ name, label,placeholder, classname,...rest }) => {
    const inputRef = useRef(null);

    const { fieldName, defaultValue="", registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        });
    }, [fieldName, registerField]);
    return (
        <>
            {label && <label htmlFor={fieldName} className="form-label">{label}</label>}

            <textarea
                className={classname}
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

export default TextArea;
