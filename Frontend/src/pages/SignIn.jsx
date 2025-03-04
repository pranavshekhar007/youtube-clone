import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Profile from "./Profile"; // Import the new Profile component

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      await axios.post(
        "http://localhost:7070/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Account created successfully! 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Sign-up failed! Try again.");
    }
  };

  // Google Sign-In
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
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
            dispatch(loginSuccess(res.data));
            toast.success("Logged in successfully! 🎉");
            navigate("/");
          });
      })
      .catch(() => {
        dispatch(loginFailure());
      });
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center h-[calc(100vh-56px)] text-gray-900 dark:text-gray-100">
      {currentUser ? (
        <Profile currentUser={currentUser} />
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
    </div>
  );
};

export default SignIn;
