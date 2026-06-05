import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../utils/Axios.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                setError('All fields are required');
                return
            }
            const userData = await instance.post('/auth/login', { email, password });
            localStorage.setItem('token', userData.data.token); 
            navigate('/dashboard');

        } catch (error) {
            console.log("Login error:", error);
            setError(error.response?.data?.message || "Login Failed!!")
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </div>
        </form>
    );
};

export default Login;