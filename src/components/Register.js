import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from './logo.png';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { username, password, name, email });
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);
                navigate('/login');
            }
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    return (
        <div className='register-page'>
            <div className='welcome-section'>
                <img src={Logo} alt='Logo' className='register-logo' />
            </div>

            <div className='register-section'>
                <h1>Register</h1>
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
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type='submit'>Register</button>
                    <button type='button' className='register-btn' onClick={() => navigate('/login')}>
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
