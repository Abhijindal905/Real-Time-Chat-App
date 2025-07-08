import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  console.log("API:", import.meta.env.VITE_API_URL);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}register/`, formData);

      setSuccess(res.data.message || "Registered successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }catch (error) {
      console.log("❌ Full error:", error.response?.data);
    
      const data = error.response?.data;
      if (data?.error) {
        setError(data.error);
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError("Registration failed.");
      }
    
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-6 gap-2 shadow-lg md:p-6 p-4 rounded-lg md:w-auto bg-white">
      
      {/* Left Side */}
      <div className="md:col-span-2 flex items-center justify-center bg-[#40b299] rounded-lg p-6">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl text-white font-bold">Welcome Back!</h1>
          <p className="text-white text-2xl font-semibold">Gupshup</p>
          <img src="/src/images/talking-icon.svg" alt="logo-icon" className="w-24 mx-auto" />
        </div>
      </div>

      {/* Right Side */}
      <div className="md:col-span-4 flex flex-col items-center justify-center px-4 py-6 space-y-4">
        <h2 className="text-[#40b299] text-2xl sm:text-3xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 font-medium text-center">{error}</p>}
        {success && <p className="text-green-600 font-medium text-center">{success}</p>}

        {loading ? (
          <div className="flex flex-col items-center mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#40b299] border-solid mb-2"></div>
            <p className="text-[#40b299] font-semibold">Redirecting to login...</p>
          </div>
        ) : (
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4 mt-4 w-full max-w-md"
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
            <button
              type="submit"
              className="bg-[#40b299] text-white py-2 rounded-full hover:bg-[#369f85] transition duration-300 w-full"
            >
              Register
            </button>
          </form>
        )}

        {!loading && (
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between border border-gray-300 p-2 rounded-md mt-4 w-full max-w-md">
            <p className="text-sm sm:text-base">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#40b299] text-white px-6 py-2 rounded-full hover:bg-[#369f85] transition w-full sm:w-auto"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
