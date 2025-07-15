import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auth/signup",{email,password})
            .then(response => {
                alert(response.data.message);
                navigate("/home");
            })
            .catch(error => {
                alert(error.response?.data?.message);
            })
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1> Signup Form </h1>
                <p>Enter Email ID</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder="Type email here"
                    autoComplete="off"
                />
                <br></br>
                <p>Enter Password</p>
                <input
                    type="password"
                    value={password}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder = "Type password here"
                    autoComplete="off"
                />
                <button type="submit">Submit</button>
            </form>

            <p>Already have an account?<Link to="/">Login Here!</Link></p>
        </div>
    )
}
export default Login;