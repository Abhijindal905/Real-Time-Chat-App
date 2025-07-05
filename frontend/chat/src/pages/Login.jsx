import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }

    console.log("Logging in with:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="h-[400px] w-[400px] border-2 border-black p-10 rounded-xl flex flex-col gap-4 hover:shadow-2xl"
      >
        <h2 className="mt-2 text-black text-center mb-5 text-[30px] font-bold">
          Login
        </h2>

        <input
          name="username"
          className="mb-5 p-2 border border-black rounded-md text-[16px] hover:shadow-2xl"
          type="text"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          className="mb-5 p-2 border border-black rounded-md text-[16px] hover:shadow-2xl"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="text-white px-6 py-2 text-[16px] rounded-full cursor-pointer bg-green-500 hover:bg-green-950"
        >
          Log In
        </button>
      </form>

      <div className="text-sm text-center mt-6">
        <a href="#" className="text-blue-600 hover:underline">
          Forgot password?
        </a>
        <br />
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
