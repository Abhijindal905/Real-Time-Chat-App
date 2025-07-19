import axios from "axios";

export const handleSendRequest = async (receiverUsername, fetchOutgoingRequests) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}send_requests/`, {
      receiver_username: receiverUsername,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    alert("Request Sent!");
    fetchOutgoingRequests();
  } catch (error) {
    alert(error.response?.data?.message || "Error Sending Request");
  }
};

export const handleAccept = async (roomId, fetchAll) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}accept_request/`, {
      room_id: roomId,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    alert("Request Accepted");
    fetchAll();
  } catch (error) {
    alert("Error accepting request");
  }
};

export const handleDecline = async (roomId, fetchPendingRequests) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}decline_request/`, {
      room_id: roomId,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    });
    alert("Request Declined");
    fetchPendingRequests();
  } catch (error) {
    alert("Error declining request");
  }
};
