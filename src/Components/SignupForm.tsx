import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface SignupFormData {
    fullName: string;
    email: string;
    contactNumber: string;
    password: string;
    examDate: string;
    isApproved: boolean;
}

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        fullName: '',
        email: '',
        contactNumber: '',
        password: '',
        examDate: '',
        isApproved: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/auth/signup`, formData);
            toast.success(response.data.message + ". Wait for admin's approval", {
                position: 'top-right',
                autoClose: 3000, // Close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setFormData({
                fullName: '',
                email: '',
                contactNumber: '',
                password: '',
                examDate: '',
                isApproved: false
            });
        } catch (error:any) {
            console.error('Signup error:', error);
            
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 3000, // Close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    };
    const today = new Date().toISOString().split('T')[0];
    return (
        <div className="custom-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="form-control" placeholder="Contact Number" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                </div>
                <div className="mb-3">
                    <input type="date" name="examDate" value={formData.examDate} onChange={handleChange} className="form-control" placeholder="Exam Date" min={today} required />
                </div>
                <input type="hidden" name="isApproved" value="false" />
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
