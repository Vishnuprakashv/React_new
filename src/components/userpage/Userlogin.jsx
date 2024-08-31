import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const hashPassword = (password) => {
    return btoa(password); 
}

const Userlogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const hashedPassword = hashPassword(password);

        try {
            const response = await axios.get(`http://localhost:3001/users?email=${email}`);
            const user = response.data[0]; 

            if (user && user.password === hashedPassword) {
                navigate("/quiz"); 
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            setError("There was an error during login. Please try again.");
        }
    };

    return (
        <div>
            <h1>User Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit">Login</button>
            </form>
            <Link to="/">Register</Link>
        </div>
    );
}

export default Userlogin;
