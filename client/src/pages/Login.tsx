import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setIsLogged} = useAuth()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/auth/login`,
        {
          email,
          password,
        }
      );
      
      localStorage.setItem("token", res.data.token);
      console.log(`email:${email}, password:${password}`);
      setIsLogged(true)

      navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
      console.error("Server Error:", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-[400px] w-[400px] bg-white rounded shadow p-5">
        <h2 className="text-2xl text-center font-semibold mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col gap-3 w-full items-center">
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
              Login
            </button>
          </div>
        </form>

        <div className="flex gap-2 mt-4 justify-center text-sm">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
