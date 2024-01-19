import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { Dashboard } from "./dashboard/dashboard";
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import VerificationMessage from './pages/VerificationMessage';
import Home from "./pages/home/Home";



function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Home/>} />

        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/verify" component={<VerificationMessage/>} />
      </Routes>
   
    </Router>
  );
}

export default App;