import { Controller } from "react-hook-form";

 interface InputProps {
    id?: string;
    className: any
    label?: string;
    type?: string;
    control: any,
    name: string,
    placeholder?: string

}

export const Input = ({ control,id, name , className, type,...props }: InputProps) => {
    
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, ref, value } }) => (
                <input
                    id={id}
                    name={name}
                    type={type ?? "text"}
                    ref={ref}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={className}
                    {...props}
                />
            )}
        />
    )
};