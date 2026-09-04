export function Input({onchange,placeholder}:{onchange:()=>void; placeholder:string})
{
    return (
        <div className="flex justify-center" >
            <input type="text" placeholder={placeholder} className="px-4 py-2 border border-black  rounded" onChange={onchange} />
        </div>
    )
}