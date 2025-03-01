import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:7070/api/auth/signin", { name, password }, { withCredentials: true });
      dispatch(loginSuccess(res.data));
      console.log("Usser logged in",res.data);
      // navigate("/")
    } catch (err) {
        dispatch(loginFailure());
    }
  };


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        axios
          .post("http://localhost:7070/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          },{withCredentials: true})
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            // navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };



  return (
    <div className=" mt-16 flex flex-col items-center justify-center h-[calc(100vh-56px)] text-gray-900 dark:text-gray-100">
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
        <button onClick={handleLogin} className="mt-3 w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 rounded font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition">
          Sign in
        </button>

        <h1 className="text-xl font-bold mt-3">or</h1>

        <button onClick={signInWithGoogle} className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition">
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
        <button className="mt-3 w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition">
          Sign up
        </button>
      </div>

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
