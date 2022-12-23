import React, { useRef, useEffect, RefObject, useState } from "react";
import Select from "react-tailwindcss-select";

interface Props {
    defaultValue: any;
    handleChange: any;
    label?: string;
    isDisabled?: boolean;
    options: any[]
}


export const Dropdown: React.FC<Props> = ({ defaultValue, options, label, handleChange, isDisabled }) => {
    return (
        <>
            {label && <label htmlFor={label} className="form-label w-full flex flex-col sm:flex-row">{label}</label>}

            <Select
                primaryColor=""
                isDisabled={isDisabled}
                isSearchable
                value={defaultValue}
                onChange={handleChange}
                options={options}
            />
        </>
    );
};



