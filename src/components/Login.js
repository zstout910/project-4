import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from './logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.status === 200) {
                // Store the username in local storage
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('password', response.data.password);
                // Redirect to the dashboard if login is successful
                navigate('/');
            }
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    return (
        <div className='login-page'>
            <div className='welcome-section'>
                <img src={Logo} alt='Logo' className='login-logo' />
            </div>

            <div className='login-section'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'  
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <button type='submit'>Login</button>
                    <button type='button' className='register-btn' onClick={() => navigate('/register')}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
