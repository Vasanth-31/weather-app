import React, { useState } from 'react';
import "./signupform.css";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successfully");
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type='text' id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Login</button>
                <p>Don't Have an Account?<Link to="/signup">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
