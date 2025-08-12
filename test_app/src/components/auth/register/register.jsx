import { useQuery } from '@tanstack/react-query'
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../AppContext.jsx';


const Register = () => {
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: ''
        });

    const { register } = useContext(AppContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData.username, formData.email, formData.password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
} 

export default Register;