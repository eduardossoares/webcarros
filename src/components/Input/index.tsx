import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    error?: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}

export function Input({ type, placeholder, name, register, rules, error }: InputProps) {
    return(
        <div className="w-full">
            <input 
            className="w-full h-10 px-4 rounded-md outline-none"
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            id={name} />
            {error && <p className="text-red-500 pt-0.5 pb-2">{error}</p>}
        </div>
    )
}