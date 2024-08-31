import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
    let navigate = useNavigate();
    let [first_name, setFirstname] = useState("");
    let [last_name, setLastname] = useState("");
    let [Identity_number, setIdentitycode] = useState("");

    let FirstName = (e) => {
        setFirstname(e.target.value.toUpperCase());
    };

    let LastName = (e) => {
        setLastname(e.target.value.toUpperCase());
    };

    let IdentityCode = (e) => {
        setIdentitycode(e.target.value);
    };

    let set = (d) => {
        d.preventDefault();

        const validCodes = ["4004004", "001001", "0505005"];
        
        if (!validCodes.includes(Identity_number)) {
            alert("Invalid Identity Number! Please enter a valid number.");
            return;
        }

        axios.get(`http://localhost:3001/admin?Identity_number=${Identity_number}`)
            .then(response => {
                if (response.data.length > 0) {
                    alert("Identity Number already exists! Please enter a unique number.");
                } else {
                    let send = {
                        "first_name": first_name.toUpperCase(),
                        "last_name": last_name.toUpperCase(),
                        "Identity_number": Identity_number
                    };

                    axios.post("http://localhost:3001/admin", send)
                        .then(() => navigate("/adminlogin"))
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Register:</h1>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" onChange={FirstName} />
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" onChange={LastName} />
            <label htmlFor="identity_code">Identity Number:</label>
            <input type="text" id="identity_code" onChange={IdentityCode} />
            <button onClick={set}>Save</button>
            <Link to="/adminlogin">Admin login</Link>
        </div>
    );
};

export default Admin;
