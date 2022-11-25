import DateCustom, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale("ptBR", ptBR)
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

type Props = {
    label?: string;
    control: any,
    classname: any,
    name: string
    handleDateChange?: () => void,
}
export default function Datepicker({ name, label, handleDateChange,  control, classname,...props }: Props) {

    return (
        <>
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <Controller
                control={control}
                name={name}
                render={({ field: {ref, value, onChange } }) => (
                    <DateCustom
                        locale={ptBR}
                        name={name}
                        ref={ref}
                        id={name}
                        selected={value ? new Date(value) : value}
                        onChange={onChange}
                        placeholderText="dd/MM/YYYY"
                        dateFormat="dd/MM/yyyy"
                        className={classname}
                        shouldCloseOnSelect
                        {...props}
                    />
                )}
            />

        </>


    )
}