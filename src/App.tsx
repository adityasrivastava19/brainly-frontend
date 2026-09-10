import './App.css';
import { Dashboard } from './pages/dashboard';
import { Signin } from './pages/signin';
import {Signup} from './pages/signup'; 
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ProtectedRoute } from './component/ui/protectedRRoute';
function App() {
  
  return(
       <BrowserRouter>
         <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
           <Route path="/signin" element={<Signin />} />
           <Route path="/signup" element={<Signup />} />
         </Routes>
       </BrowserRouter>
  )
}

export default App;
