import React, { useState } from 'react';
import style from "./register.module.css";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const hashPassword = (password) => {
    
    return btoa(password); 
}

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3001/users?email=${email}`);
            return response.data.length > 0;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const emailExists = await checkEmailExists(email);

        if (emailExists) {
            setError("Email already in use. You can log in.");
            return;
        }

        const hashedPassword = hashPassword(password);

        const userData = {
            email,
            password: hashedPassword
        };

        axios.post('http://localhost:3001/users', userData)
            .then(() => {
                navigate("/userlogin");
            })
            .catch(error => {
                console.error('Error:', error);
                setError("There was an error saving your information. Please try again.");
            });
    };

    return (
        <div className={style.register_box}>
            <div className={style.register_form_box}>
                <div className={style.Home_link}>
                    <h1>Start quiz</h1>
                    <Link to="/admin">Admin Site</Link>
                </div>
                <form className={style.form_box} onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                    <label htmlFor="password">Set password:</label>
                    <input type="password" id="password" placeholder='Set password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className={style.error_message}>{error}</p>} 
                    <button type="submit">Submit</button>
                    <Link to="/userlogin">Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
