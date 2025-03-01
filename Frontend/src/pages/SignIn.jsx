import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess, logout } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);


  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "http://localhost:7070/api/auth/signin",
        { name, password },
        { withCredentials: true }
      );
      dispatch(loginSuccess(res.data));
      toast.success("Logged in successfully! 🎉");
      console.log("Usser logged in", res.data);
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      toast.error("Login failed! Please check your credentials.");
    }
  };

  // Handle User Signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7070/api/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("Account created successfully! 🎉");
      navigate("/");
      console.log("User signed up:", res.data);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Sign-up failed! Try again.");
    }
  };

  // handle with google
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        axios
          .post(
            "http://localhost:7070/api/auth/google",
            {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            toast.success("Logged in successfully! 🎉");
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  // Handle LogOut
  const handleLogout = () => {
    dispatch(logout()); // Clear user data in Redux
    setShowDropdown(false);
    toast.success("Logged out successfully! 👋");
    navigate("/", { replace: true }); // Redirect to SignIn
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center h-[calc(100vh-56px)] text-gray-900 dark:text-gray-100">
      {currentUser ? (
        <div className="relative flex items-center space-x-3">
          {/* Profile Section */}
          <img
            src={currentUser.img || "/default-avatar.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600 hover:shadow-lg"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          <p
            className="font-semibold cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {currentUser.name}
          </p>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-14 right-0 bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-600 rounded-lg p-4 w-60"
            >
              <p className="font-bold text-lg">{currentUser.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentUser.email}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 rounded-lg w-80">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <h2 className="text-lg font-light mb-3">to continue</h2>

          <input
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 rounded font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Sign in
          </button>

          <h1 className="text-xl font-bold mt-3">or</h1>

          <button
            onClick={signInWithGoogle}
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
          >
            Sign in with Google
          </button>

          <h1 className="text-xl font-bold mt-3">or</h1>

          <input
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-transparent text-gray-900 dark:text-gray-100"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignUp}
            className="mt-3 w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Sign up
          </button>
        </div>
      )}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex flex-col items-center">
        <span>English (USA)</span>
        <div className="flex space-x-4 mt-2">
          <span className="cursor-pointer hover:underline">Help</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
