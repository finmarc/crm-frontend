import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

interface InputProps {
    id?: string;
    className: any
    options: any[];
    optionSelected?: any;
    type?: string;
    control: any,
    name: string,
    placeholder?: string

}

export const Select = ({ control, id, name, className, options, type, placeholder, optionSelected, ...props }: InputProps) => {
    let defaultValue = {};

    if(optionSelected) {
       defaultValue = {
          value: optionSelected.id,
          label: optionSelected.name,
       } 
    }

    return (
        <Controller
            name="ReactSelect"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <ReactSelect
                {...props}
                className={className}
                placeholder={placeholder}
                isClearable
                onChange={onChange}
                onBlur={onBlur}
                options={options}
                ref={ref}
                defaultValue={defaultValue}

              />
            )}
          />
        // <Controller
        //     control={control}
        //     name={name}
        //     render={({ field: { onChange, onBlur, ref, value } }) => (
        //         <input
        //             id={id ?? name}
        //             type={type ?? "text"}
        //             ref={ref}
        //             onChange={onChange}
        //             onBlur={onBlur}
        //             value={value}
        //             className={className}
        //             {...props}
        //         />
        //     )}
        // />
    )

    
};