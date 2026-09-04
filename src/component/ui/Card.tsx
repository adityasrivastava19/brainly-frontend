import { ShareIcon } from "../../../icon/shareicon";
import { DeleteIcon } from '../../../icon/deleteicon';
import { YoutubeIcon } from '../../../icon/youtubeIcon';
import { TweeterIcon } from '../../../icon/tweetericon';
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
                <div className="w-10 h-10 rounded-md cursor-pointer transition-shadow hover:shadow-md  hover:bg-gray-200 flex items-center justify-center">
                {type==="youtube"&& <YoutubeIcon/>}
                {type==="tweeter"&& <TweeterIcon/>}
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
         <blockquote className="twitter-tweet"> <a href={link}>August 31, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charSet="utf-8"></script>
    </div> }
    {type==="youtube"&& <div>
        {(() => {
          let videoId = '';
          if (link.includes('youtu.be/')) {
            videoId = link.split('youtu.be/')[1].split('?')[0];
          } else if (link.includes('watch?v=')) {
            videoId = link.split('watch?v=')[1].split('&')[0];
          }
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return <iframe className="w-full mt-6 rounded-md" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>;
        })()}
    </div>}
     
    </div>)
}