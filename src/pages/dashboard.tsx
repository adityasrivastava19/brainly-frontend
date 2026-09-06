import { PluseIcon } from "../../icon/plusicon";
import { ShareIcon } from "../../icon/shareicon";
import { useState } from 'react';
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { CreateModal } from "../component/ui/createModeal";
export function Dashboard() {
  const [modelopen,setmodal]=useState(false);
  return (
    <div>
      {CreateModal(modelopen, () => {
        setmodal(false)
      })}
      <div className="flex gap-2 p-4 justify-end">
        <Button variant='secondary' startIcon={<ShareIcon />} size="md"  text='Share Brain'/>
        <Button variant='primary' startIcon={<PluseIcon />} size="md"  text='Add Content' onClick={()=>setmodal(true)}/>
      </div>
    <div className="flex gap-2 p-4 ">
      <Card type="youtube" link="https://youtu.be/oVrLk0C2nas?si=RUnYZ92FTd6WfK1B" title="Example card" />
    </div>
    </div>
  );
}
