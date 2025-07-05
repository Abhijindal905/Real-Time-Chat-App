import React, { useState } from "react";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("......");
      return;
    }

    console.log("Logging in with:", { username, password });
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
          className="mb-5 p-2 border border-black rounded-md text-[16px] hover:shadow-2xl"
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="mb-5 p-2 border border-black rounded-md text-[16px] hover:shadow-2xl"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
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
        Don't have Acount ? 
         <a href="/register" className="text-blue-600 hover:underline ">
          Sign up
        </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
