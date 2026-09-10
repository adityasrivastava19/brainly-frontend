import { AcadmicIcon } from '../../icon/acadmicicon';
import { TweeterIcon } from '../../icon/tweetericon';
import { YoutubeIcon } from '../../icon/youtubeIcon';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
export function SideBar()
{
    const navigate = useNavigate();
    return (
        <div>
            <div className='w-50 min-h-screen  fixed bg-white shadow shadow-lg  gap-2 flex flex-col'>
                <div className='flex '>
                    <div>
                <AcadmicIcon size='lg'/>
                </div>
                 <div>
                    <h1 className="text-2xl font-semibold ml-2">
                            Second Brain
                        </h1>
                 </div>
                 </div>
                 <div className='mt-10 ml-3 flex gap-2 items-center cursor-pointer '  >
                    <div >
                        <YoutubeIcon/>
                    </div >
                    <div className='text-xl font-semibold text-slate-600'>
                        Video
                    </div>
                    
                 </div>
                 <div className='mt-10 ml-3 flex gap-2 items-center cursor-pointer '  >
                    <div >
                        <TweeterIcon/>
                    </div >
                    <div className='text-xl font-semibold text-slate-600'>
                        Tweets
                    </div>
                 </div>
                 <div className='mt-auto flex justify-end p-3'>
                        <div>
                        <Button variant="logout" text="logout" size="md" onClick={()=>{
                            localStorage.removeItem("token")
                            navigate("/signin");
                        }}/>
                    </div>
                    </div>
            </div>
        </div>
    )
}