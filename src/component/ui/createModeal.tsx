import { CrossIcon } from '../../../icon/crossicon';
import { Input } from "./inputBox";
import { Button } from "./Button";
export function CreateModal(open: boolean, onClose: () => void)
{
    return (
        <div >
            {open &&  <div className="fixed inset-0 flex items-center justify-center">

                    
                    <div className="absolute inset-0 bg-slate-200/60" />
                    <div className="h-80 w-70 relative bg-[#F5F1E8] p-4 rounded-lg">

                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                        <CrossIcon/>
                        </div>
                        <div >
                            <div className="mt-10 mb-6">
                            <Input onchange={()=>{}} placeholder="Title"/>
                            </div>
                            <div className="mb-6">
                            <Input onchange={()=>{}} placeholder="Link"/>
                            </div>
                            <div className="flex justify-center">
                            <Button variant="primary" text="Submit" size="md" />
                            </div>
                        </div>
                    </div>

                </div>}
        </div>
    )
}