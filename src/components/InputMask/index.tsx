import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps {
    id: string;
    mask: any;
    typeMask?: string;
    className: any
    control: any,
    name: string,
    placeholder?: string
}

export const MaskedInput = ({ control, name, mask, className, placeholder, typeMask, ...props }: InputProps) => {
    return (
        <Controller
            control={control}
            name={name}
        
            render={({ field: { onChange, onBlur, ref, value } }) => (
                <InputMask
                    type="text"
                    inputRef={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ""}
                    mask={mask}
                    className={className}
                    placeholder={placeholder}
                    {...props}
                />
            )}
        />
    )
};