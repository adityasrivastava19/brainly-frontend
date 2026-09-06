import { CrossIcon } from '../../../icon/crossicon';
import { Input } from "./inputBox";
import { Button } from "./Button";
import { useForm } from 'react-hook-form';

type FormValues = {
    title: string;
    link: string;
};

export function CreateModal(open: boolean, onClose: () => void)
{
    const { register, handleSubmit } = useForm<FormValues>();

    function onsubmit(data: FormValues)
    {
        console.log(data);
    }

    return (
        <div >
            {open &&  
                <form onSubmit={handleSubmit(onsubmit)}>
            <div className="fixed inset-0 flex items-center justify-center">

                                   
                    <div className="absolute inset-0 bg-slate-200/60" />
                    <div className="h-80 w-70 relative bg-[#F5F1E8] p-4 rounded-lg">

                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                        <CrossIcon/>
                        </div>
                        <div >
                            <div className="mt-10 mb-6">
                            <Input placeholder="Title" res={register("title")}/>
                            </div>
                            <div className="mb-6">
                            <Input placeholder="Link" res={register("link")}/>
                            </div>
                            <div className="flex justify-center">
                            <Button variant="primary" text="Submit" size="md" />
                            </div>
                             
                        </div>
                    </div>

                </div>
                </form>}
        </div>
    )
}