import { PlusIcon } from "../../../icon/plusicon";
import { ShareIcon } from "../../../icon/shareicon";
import { DeleteIcon } from '../../../icon/deleteicon';
import { YoutubeIcon } from '../../../icon/youtubeIcon';
interface cardProps{
    type:"youtube"|"tweeter",
    link:string,
    title:string 
}
export function Card({ type, link, title }: cardProps)
{
    return( 
    <div className="min-w-60 max-w-70 min-h-80 max-h-90 bg-white p-4 rounded-md  outline outline-slate-200 border border-gray-100 overflow-hidden">
        <div className="flex justify-between ">
            <div className="flex items-center text-gray-800">
                <div className="w-10 h-10 rounded-md cursor-pointer transition-shadow hover:shadow-md hover:shadow-gray-400 hover:bg-gray-200 flex items-center justify-center">
                <YoutubeIcon/>
                </div>
                <div className="text-lg">
                {title}
                 </div>
            </div>
            <div className="flex text-gray-800">
                <div className="pr-2 w-10 h-10 rounded-md cursor-pointer transition-shadow hover:shadow-md hover:shadow-gray-400 hover:bg-gray-200 flex items-center justify-center">
                    <ShareIcon/>
                    </div>
                <div className="w-10 h-10 rounded-md cursor-pointer transition-shadow hover:shadow-md hover:shadow-gray-400 hover:bg-gray-200 flex items-center justify-center">
                    <DeleteIcon/>
                    </div> 
            </div>
        </div>
        {type==="tweeter"&&  <div className=" flex justify-content origin-top scale-y-50 scale-x-90 mb-6 cursor-pointer">
         <blockquote className="twitter-tweet"> <a href="https://x.com/ajeetbharti/status/2094532559724261666?ref_src=twsrc%5Etfw">August 31, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charSet="utf-8"></script>
    </div> }
    {type==="youtube"&& <div>
        <iframe className="w-full mt-6 rounded-md" src="https://www.youtube.com/embed/YlbY94c0w8s?si=oBgHPbSLCmpkz2bR" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>}
     
    </div>)
}