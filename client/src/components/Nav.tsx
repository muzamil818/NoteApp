
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
      className="w-full h-15 bg-[#112d3d] shadow-1xl
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
           <button className="relative z-1 flex h-[30px] w-[100px] items-center justify-center whitespace-nowrap rounded-[10px] border-none bg-transparent px-5 py-5 text-[16px] text-[#f0f0f0] outline-none select-none cursor-pointer 
  before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-full before:w-full before:rounded-[10px] before:bg-[#28282d] before:transition-all before:duration-400 before:-z-99999
  after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[35px] after:w-[35px] after:translate-x-2.5 after:translate-y-2.5 after:rounded-[50px] after:bg-[#ffffff15] after:backdrop-blur-[5px] after:transition-all after:duration-400 after:-z-99999
  hover:before:translate-x-[5%] hover:before:translate-y-[20%] hover:before:h-[110%] hover:before:w-[110%]
  hover:after:translate-x-0 hover:after:translate-y-0 hover:after:h-full hover:after:w-full hover:after:rounded-[10px]
  active:after:translate-y-[5%] active:after:transition-none" onClick={handleUser}>Sign out</button>
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
