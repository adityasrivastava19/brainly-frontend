import type { UseFormRegisterReturn } from "react-hook-form";
export function Input({placeholder,res,type}:{placeholder:string,res:UseFormRegisterReturn,type:string})
{
    return (
        <div className="flex justify-center" >
            <input type={type} placeholder={placeholder} className="px-4 py-2 border border-black  rounded"  {...res}/>
        </div>
    )
}