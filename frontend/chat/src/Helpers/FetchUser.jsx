import React from 'react'

export const fetchUsers = async (setUsers) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}list_users/`);
        setUsers(res.data);
    } catch (error) {
        console.error("Error fetching users", error);
    }
}