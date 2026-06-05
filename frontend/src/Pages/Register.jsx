import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import instance from '../utils/Axios.js';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleRegister = async(e) => {
        e.preventDefault();
        
        try {
            if(!name || !email || !mobile || !password)
            {
                setError("All the fields are required!!");
                return;
            }

            const userData = await instance.post("/auth/register", {name, email, mobile, password});
            console.log("User registered successfully:", userData.data.safeUser.email);
            navigate('/login');

        } catch (error) {
            console.error("Register Error:", error);
            setError(error.response?.data?.message || "Registration failed");
        }
    }

    return(
    <form onSubmit={handleRegister}>
        <div>
            <h2>Register</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input type="text" value={name} placeholder = 'name' onChange={(e) => setName(e.target.value)} />
            <input type="text" value={email} placeholder = 'email' onChange={(e) => setEmail(e.target.value)} />
            <input type="number" value={mobile} placeholder = 'mobile' onChange={(e) => setMobile(e.target.value)} />
            <input type="password" value={password} placeholder = 'password' onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Submit</button>
        </div>
        
    </form>
    );
};

export default Register;