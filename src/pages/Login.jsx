import { useState } from "react";
import { useLoginUserMutation } from "../redux/api/authApi/authApi";

    const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
        const [login, { isLoading }] = useLoginUserMutation();

        const handleSubmit = async (e) => {

  
            e.preventDefault();
           const data = await login({ email, password });
           console.log(data);
        }

        if(isLoading){
            return <div>Loading...</div>
        }

  return (
    <section className="flex justify-center items-center  min-h-[calc(100vh-360px)]" >
      <div className="w-full max-w-md p-6 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

 