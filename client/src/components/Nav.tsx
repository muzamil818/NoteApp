
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState } from "react";

const Nav = () => {
  const {isLogged, setIsLogged }= useAuth()
  const navigate = useNavigate();  

  const handleUser = async () =>{

     localStorage.removeItem("token")
     setIsLogged(false)
     navigate('/login')
  }
  
  return (
    <div
      className="w-full h-15 bg-gray-800 shadow-1xl
      flex justify-between px-10 py-5 items-center sticky top-0  z-9999"
    >
      <div className="text-white">
        <h1 className="text-3xl cursor-pointer">Notify</h1>
      </div>
      <div className="text-white flex gap-6 *:hover:underline *:decoration-wavy *:decoration-2 *:transition-all:0.5s *:cursor-pointer">
        <Link className="px-4 py-1 text-center " to="/">Home</Link>
        {isLogged ? (
          <>
            {" "}
           <button className="bg-red-600 px-4 py-1  text-center rounded" onClick={handleUser}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
