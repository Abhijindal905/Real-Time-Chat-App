import axios from "axios";

export const fetchUsers = async (setUsers) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}list_users/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });
        setUsers(res.data);
    } catch (error) {
        console.error("Error fetching users", error);
    }
};


export const fetchOutgoingRequests = async (setOutgoingRequests) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}outgoing_requests/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    setOutgoingRequests(res.data);
  } catch (error) {
    console.error("Error fetching outgoing requests", error);
  }
};

export const fetchPendingRequests = async (setPendingRequests) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}pending_requests/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    setPendingRequests(res.data);
  } catch (error) {
    console.error("Error fetching pending requests", error);
  }
};

export const fetchAcceptedRooms = async (setAcceptedRooms) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}accepted_rooms/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    setAcceptedRooms(res.data);
  } catch (error) {
    console.error("Error fetching accepted rooms", error);
  }
};
