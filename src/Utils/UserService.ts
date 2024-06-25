// src/services/userService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/users';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL + '/getUsers');
        const users: any = response.data;
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const approveUser = async (userId: string) => {
    try {
        await axios.get(API_URL + `/approve/${userId}`);
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const rejectUser = async (userId: string) => {
    try {
        await axios.get(API_URL + `/reject/${userId}`);
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
