import React from "react";
import axios from "axios";

export const fetchOutgoingRequests = async (setOutgoingRequests) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}outgoing_requests/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });
        setOutgoingRequests(res.data);
    } catch (error) {
        console.error("Error fetching outgoing requests", error);
    }
}