import { PlusIcon } from '../icon/shareicon';
import './App.css'
import { Button } from "./component/ui/Button";
function App() {
  return (
    <div>
      <Button starticon={<PlusIcon />} varient='primary' size='md' text='Share' onclick={() => {}} />
        <Button varient='secondary' size='md' text='Add Content' onclick={() => { }} />
    </div>
  )
}

export default App
