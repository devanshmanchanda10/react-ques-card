import {
  BrowserRouter,
  createBrowserRouter,
  Routes,Route
} from "react-router-dom";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";

const App=()=>{
return (
  <div>
    <BrowserRouter>
    <Routes>
<Route path="/" element ={<Homepage />} />
<Route path="/dashboard" element ={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  </div>
)
}

export default App;