import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve the username from local storage
        const storedUsername = localStorage.getItem('username');
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');

        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedName) {
            setName(storedName);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <div className='profile-page'>
            <div className='profile-container'>
                <div className='profile-info'>
                    <h1 className='profile-title'>Profile</h1>
                    <div className='profile-section'>
                        <h2>Username:</h2>
                        <div className='info-section'>{username}</div>
                    </div>
                    <div className='profile-section'>
                        <h2>Name:</h2>
                        <div className='info-section'>{name}</div>
                    </div>
                    <div className='profile-section'>
                        <h2>Email:</h2>
                        <div className='info-section'>{email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
