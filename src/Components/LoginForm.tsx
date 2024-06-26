import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomSpinner from './Spinner';


interface LoginFormState {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    });
    const [isLoading, setLoading] = useState(false); // Loading state
    const { login } = useAuth();
    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while submitting
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/auth/login`, formData);
            const token: any = response.data.token;
            login(token, response.data.isAdmin);
            response.data.isAdmin ? null : localStorage.setItem("userId", response.data.userId);
            toast.success('Login successful', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            response.data.isAdmin ? history.push('/admin-dashboard') : history.push('/user-dashboard');

            setFormData({
                email: '',
                password: ''
            });
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setLoading(false); // Reset loading state regardless of success or error
        }
    };

    return (
        <>
            {isLoading ? <CustomSpinner /> :
                <div className="custom-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required disabled={isLoading} />
                        </div>
                        <div className="mb-3">
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required disabled={isLoading} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            }
        </>
    );
};

export default LoginForm;
