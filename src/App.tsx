import './App.css';
import { Button } from "./component/ui/Button";
import { Card } from './component/ui/Card';
function App() {
  return (
    <div className="flex gap-2 p-4 ">
      <Card type="tweeter" link="#" title="Example card" />
    </div>
  );
}

export default App;
