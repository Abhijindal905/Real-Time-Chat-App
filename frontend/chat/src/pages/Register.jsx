function Register() {
  return (
    <div className="md:m-4 m-2 border border-[#40b299] grid grid-cols-6 gap-2 shadow-lg md:p-2 rounded-lg md:w-auto">
      <div className="md:col-span-2 col-span-6 bg-[#40b299] rounded-lg">
        <div className="h-full w-full mx-auto my-auto text-center flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-4xl text-white font-bold">Welcome Back!</h1>
          <p className="text-white font-bold text-4xl">
            Gupshup
          </p>
          <img src="/src/images/talking-icon.svg" alt="logo-icon" className="w-full" />
        </div>
      </div>
      <div className="md:col-span-4 col-span-6 flex flex-col items-center justify-center p-8 space-y-4">
        <h2 className="text-[#40b299] text-3xl font-bold">Create an Account</h2>
        <form className="flex flex-col gap-4 mt-4 md:w-[400px] h-auto w-full">
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="border border-gray-300 p-2 rounded-md"
          />
          <button className="bg-[#40b299] text-white px-6 py-2 rounded-full hover:bg-[#369f85] transition duration-300 cursor-pointer mx-auto">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
