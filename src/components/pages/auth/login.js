import React, { useState, useEffect } from 'react';
import { navigate } from 'hookrouter';
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === '') {
            setError(true);
            setErrorMessage('Error: All fields must be completed.');
        } else {
            fetch('https://hookstore-amberlyn-api.herokuapp.com/user/verify', {
                method: 'POST',
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res === 'User NOT verified') {
                    setError(true);
                    setErrorMessage('Error: User is NOT verified');
                } else {
                    setError(false);
                    setErrorMessage('');
                    Cookies.set('username', username);
                    navigate('/');
                }
            })
            .catch(error => {
                console.log('Error with logging in, please try again.', error);
                setError(true);
                setErrorMessage('Error with logging in, please try again.');
            })
        }

    }

    useEffect(() => {
        setError(false);
        setErrorMessage('');
    }, [username, password])

    
    return (
        <div className="login-container main-body">
            <h2 className="title">Login Here</h2>

            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <input type='text' placeholder='username' value={username} name='username' onChange={(e) => setUsername(e.target.value)} />
                <input type='text' placeholder='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />

                <button className="btn" type='submit'>Login</button>
            </form>

            <h3 style={{visibility: error ? 'visible' : 'hidden'}}>{errorMessage}</h3>
        </div>
    )
}