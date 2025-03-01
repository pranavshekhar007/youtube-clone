import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // ✅ Use named import
import logo from "../assets/logo.png";

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log("🟡 Navbar received user:", currentUser.img);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Now it works!
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <nav className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 z-50 shadow-md items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <AiOutlineMenu className="text-2xl cursor-pointer" />
        </button>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28 cursor-pointer" />
        </Link>
      </div>

      {/* Middle Search Bar */}
      <div className="flex items-center w-[35%]">
        <div className="w-full flex border rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 outline-none text-sm"
          />
          <button className="px-4 py-2 bg-gray-100 border-l">
            <CiSearch size={24} />
          </button>
        </div>
        <IoMdMic
          size={42}
          className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex space-x-5 items-center">
        <RiVideoAddLine className="text-2xl cursor-pointer" />
        <AiOutlineBell className="text-2xl cursor-pointer" />

        {currentUser ? (
          <div className="flex items-center gap-2 font-medium">
            {/* Profile Image */}
            <img
              src={currentUser?.img}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border"
              referrerPolicy="no-referrer"
            />
            <span>{currentUser.name}</span>
          </div>
        ) : (
          <Link to="/signin">
            <button className="px-4 py-1 bg-blue-600 text-white rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
