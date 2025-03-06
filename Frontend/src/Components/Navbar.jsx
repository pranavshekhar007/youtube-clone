import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai"; // Use named import
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import logo from "../assets/logo.png";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoUpload from "./VideoUpload";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // Decode token and set user state if a token exists in localStorage
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Logout
  const handleSignOut = () => {
    dispatch(logout()); // Dispatch logout action
    setDropdownOpen(false);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <>
      {/* Navbar Container */}
      <nav className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 z-50 shadow-md items-center">
        {/* Left Section: Sidebar Toggle and Logo */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar}>
            <AiOutlineMenu className="text-2xl cursor-pointer" />
          </button>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-28 cursor-pointer" />
          </Link>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="flex items-center w-[35%]">
          <div className="w-full flex border rounded-full overflow-hidden">
            <input
              type="text"
              className="w-full px-3 py-2 outline-none text-sm"
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="px-4 py-2 bg-gray-100 border-l">
              <CiSearch size={24} onClick={() => navigate(`/search?q=${q}`)} />
            </button>
          </div>
          <IoMdMic
            size={42}
            className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
          />
        </div>

        {/* Right Section: Video Upload, Notifications, Profile Dropdown */}
        <div className="flex space-x-5 items-center">
          {/* Video Upload Button */}
          <Link to="upload">
            <RiVideoAddLine className="text-xl cursor-pointer" />
          </Link>

          {/* Notification Icon */}
          <AiOutlineBell className="text-2xl cursor-pointer" />

          {/* User Profile and Dropdown */}
          {currentUser ? (
            <div className="relative">
              {/* Profile Image - Toggle Dropdown on Click */}
              <img
                src={currentUser?.img || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-lg py-2 z-50"
                >
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Channel
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Sign In Button
            <Link to="signin">
              <button className="px-4 py-1 bg-blue-600 text-white rounded">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
      {/* Video Upload Modal (if open) */}
      {open && <VideoUpload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
