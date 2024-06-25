// src/components/LoginForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginFormState {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    });
    const [isDisabled, setButtonValue] = useState(false);
    const { login } = useAuth();
    const history = useHistory();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/auth/login`, formData);
            const token:any = response.data.token;
            login(token,response.data.isAdmin);
            toast.success('Login successful',{
                position: 'top-right',
                autoClose: 3000, // Close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            response.data.isAdmin ? history.push('/admin-dashboard'): history.push('/user-dashboard');

            setFormData({
                email: '',
                password: ''
            });
        } catch (error:any) {
            
            toast.error(error.response.data.message,{
                position: 'top-right',
                autoClose: 3000, // Close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setButtonValue(true);
        }
    };

    return (
        <div className="custom-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isDisabled}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
