import type { UseFormRegisterReturn } from "react-hook-form";
export function Input({placeholder,res}:{placeholder:string,res:UseFormRegisterReturn})
{
    return (
        <div className="flex justify-center" >
            <input type="text" placeholder={placeholder} className="px-4 py-2 border border-black  rounded"  {...res}/>
        </div>
    )
}