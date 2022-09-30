import React, { useRef, useEffect, RefObject, useState } from "react";
import { useField } from "@unform/core";

interface SelectProps {
    name: string;
    className: any;
    label?: string;
    options: any[]
}

type Props = JSX.IntrinsicElements["select"] & SelectProps;


const Select: React.FC<Props> = ({ name, options, label, ...rest }) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [valueSelect, setValueSelect] = useState();

    const handleChange = (ev: any) => {
        setValueSelect(ev.target.value);
    }
    if (!valueSelect && defaultValue) {
        setValueSelect(defaultValue);
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef,
            getValue: (ref: RefObject<HTMLSelectElement>) => {
                return ref.current?.value;
            },
            setValue: (ref, newValue) => {
                ref.current.value = newValue;
            },
        });
    }, [fieldName, registerField]);


    return (
        <>
            {label && <label htmlFor={fieldName} className="form-label w-full flex flex-col sm:flex-row">{label}</label>}

        <select
            id={fieldName}
            ref={selectRef}
            value={valueSelect}
            onChange={handleChange}
            {...rest}
        >
            <option value="">Selecione um opção</option>
            {options.map((option) => (
                <option key={option.id} value={option.id} >
                    {option.name}
                </option>
            ))}
        </select>
        </>
    );
};

export default Select;


