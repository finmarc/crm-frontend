import { useRef, useEffect, RefObject } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useField } from '@unform/core';

const AsyncSelect = ({ name, ...rest }: any) => {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: RefObject<HTMLSelectElement>) => {
                console.log(ref.current)
                return ref.current?.value;
            },
            setValue: (ref, newValue) => {
                ref.current.value = newValue;
            },
        });
    }, [fieldName, registerField]);
    return (
        <AsyncCreatableSelect
            onCreateOption={ev =>  console.log(ev)}
            ref={selectRef}
            // classNamePrefix="react-select"
            formatCreateLabel={value => `Criar novo:  ${value}`}
            {...rest}
        />
    );
};
export default AsyncSelect;