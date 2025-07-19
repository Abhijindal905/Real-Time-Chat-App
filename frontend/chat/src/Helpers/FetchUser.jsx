import React from 'react'
import axios from 'axios';

export const fetchUsers = async (setUsers) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}list_users/`);
        console.log("fetching users")
        setUsers(res.data);
    } catch (error) {
        console.error("Error fetching users", error);
    }
}