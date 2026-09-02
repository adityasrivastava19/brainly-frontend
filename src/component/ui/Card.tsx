import { PlusIcon } from "../../../icon/plusicon";
import { ShareIcon } from "../../../icon/shareicon";

export function Card()
{
    return( 
    <div className="min-w-60 max-w-70 min-h-80 max-h-90 bg-white p-4 rounded-md  outline outline-slate-200 border border-gray-100">
        <div className="flex justify-between ">
            <div className="flex items-center">
                <div>
                <ShareIcon/>
                </div>
                <div className="text-md">
                 Project idea
                 </div>
            </div>
            <div className="flex">
                <ShareIcon/>
                <PlusIcon/>
            </div>
        </div>
        <div className="w-full mt-8 rounded-md overflow-hidden">
         <iframe className="w-full aspect-video block" src="https://www.youtube.com/embed/m8JHLzV2M3s?si=G38-da4na5CWAI13" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    </div>)
}