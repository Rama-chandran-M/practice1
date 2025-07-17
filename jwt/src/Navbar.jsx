import { setToken } from "./utils"
import { useNavigate } from "react-router-dom";
import './navbar.css'
function Navbar(){
    const navigate = useNavigate();
    const handleLogout = () =>{
        setToken('');
        navigate('/');
    }
    return(
        <div className="navbar">
            <div className="navbar-left">
                <span className="navbar-brand">The To-Do List Application</span>
            </div>
            <div className="navbar-right">
                <button className="logout-button" onClick={handleLogout()}>Logout</button>
            </div>
        </div>
    )
}
export default Navbar