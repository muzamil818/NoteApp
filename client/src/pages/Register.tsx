import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URI}/auth/register`, {
        name,
        email,
        password,
      });
   
      
      localStorage.setItem("token", res.data.token);
      console.log(`name: ${name}, email: ${email}, password: ${password}`)
      navigate("/");
    } catch (err: any) {
      alert(`Registration failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-[400px] w-[400px] bg-white rounded shadow p-5">
        <h2 className="text-2xl text-center font-semibold mb-5">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-3 w-full items-center">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[274px] px-3 py-2 border rounded outline-none"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[274px] px-3 py-2 border rounded outline-none"
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[274px] px-3 py-2 border rounded outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Register
            </button>
          
          </div>
        </form>

        <div className="flex gap-2 mt-4 justify-center text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Register;
