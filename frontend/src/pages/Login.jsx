import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
