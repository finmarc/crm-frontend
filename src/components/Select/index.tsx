import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

interface SelectProps {
    value: string;
    label: string;
}
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
    let defaultValue: SelectProps;

    if (optionSelected) {
        defaultValue = {
            value: optionSelected.id,
            label: optionSelected.name,
        }
    }

    return (
        <Controller
            name="ReactSelect"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => defaultValue?.value !== undefined ? (
                <ReactSelect
                    {...props}
                    className={className}
                    isClearable
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    options={options}
                    ref={ref}
                    defaultValue={defaultValue}
                />
            ) : (
                <ReactSelect
                    {...props}
                    className={className}
                    isClearable
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    options={options}
                    ref={ref}
                />
            )}
        />
    )


};