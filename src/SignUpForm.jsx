import React, { useState } from 'react';
import "./signupform.css";
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account Created");
            navigate("/signin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type='text' id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Sign Up</button>
                <p>Already Registered? <Link to="/signin">Login</Link></p>
            </form>
        </div>
    );
};

export default SignUpForm;
