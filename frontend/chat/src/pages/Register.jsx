function Reg(params) {
  return (
    <div className="container grid grid-cols-6 gap-2 mx-auto my-auto shadow-lg p-4 rounded w-auto md:max-h-3/4">
      <div className="md:col-span-2 col-span-6 bg-[#40b299]">
        <h1 className="text-4xl text-white font-bold">Welcome Back!</h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ea.
        </p>
        <button className="bg-white text-[#40b299] px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
          Sign In
        </button>
      </div>
      <div className="md:col-span-4 col-span-6">
        <h2 className="text-[#40b299] text-3xl font-bold">Create an Account</h2>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
        <form className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded-md"
          />
          <button className="bg-[#40b299] text-white px-6 py-2 rounded-full hover:bg-[#369f85] transition duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default Reg;
