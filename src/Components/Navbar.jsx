import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.png"
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <nav className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 z-50 shadow-md">
      <div className=" flex items-center space-x-4 ">
       <button onClick={toggleSidebar}>
       <AiOutlineMenu className="text-2xl cursor-pointer" />
       </button>
        <img src={logo} alt="" className="w-28 cursor-pointer" />
      </div>
      <div className="flex w-[35%] items-center ">
        <div className="w-[100%] px-3 py-2 border rounded-l-full">
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
        <button className="px-4 py-2 border bg-gray-100 rounded-r-full">
          <CiSearch size={"24px"} />
        </button>
        <IoMdMic
          size={"42px"}
          className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
        />
      </div>
      <div className="flex space-x-5 items-center ">
        <RiVideoAddLine className="text-2xl" />
        <AiOutlineBell className="text-2xl" />
        {user ? (
          <div className="flex items-center space-x-2">
            <Avatar src={user.avatar || "https://example.com/default-avatar.png"} size="32" round={true} />
            <span className="font-semibold">{user.username}</span>
          </div>
        ) : (
          <Link to="/register">
            <button className="px-4 py-1 bg-blue-600 text-white rounded">Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
