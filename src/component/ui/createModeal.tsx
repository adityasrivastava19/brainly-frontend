import { CrossIcon } from '../../icon/crossicon';
import { Input } from "./inputBox";
import { Button } from "./Button";
import { useForm } from 'react-hook-form';
import { Dropdown } from './dropbox';
export type FormValues = {
    title: string;
    link: string;
    type: "youtube" | "tweet" | "document" | "link";
};

export function CreateModal({ open, onClose, onAddCard }: {
    open: boolean;
    onClose: () => void;
    onAddCard: (card: FormValues) => void;
})
{
    const { register, handleSubmit } = useForm<FormValues>();

    function onsubmit(data: FormValues)
    {
        onAddCard(data);
        onClose();
    }

    return (
        <div >
            {open &&  
                <form onSubmit={handleSubmit(onsubmit)} className="fixed inset-0 z-40">
            <div className="fixed inset-0 flex items-center justify-center">

                                   
                    <div className="absolute inset-0 bg-slate-200/60" />
                    <div className="h-100 w-80 relative z-50 bg-[#F5F1E8] p-4 rounded-lg">

                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                        <CrossIcon/>
                        </div>
                        <div >
                            <div className='flex justify-center' >
                                <Dropdown res={register("type") } size='lg'/>
                            </div>
                            <div className="mt-10 mb-6">
                            <Input type="text" placeholder="Title" res={register("title")}/>
                            </div>
                            <div className="mb-6">
                            <Input type="text" placeholder="Link" res={register("link")}/>
                            </div>
                            <div className="flex justify-center">
                            <Button variant="primary" text="Submit" size="login" type="submit" />
                            </div>
                             
                        </div>
                    </div>

                </div>
                </form>}
        </div>
    )
}