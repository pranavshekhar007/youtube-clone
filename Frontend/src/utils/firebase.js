// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaHEJ2hlB_5g6ER-ZTo2DNZ3C1kIh8DZI",
  authDomain: "video-9e9df.firebaseapp.com",
  projectId: "video-9e9df",
  storageBucket: "video-9e9df.firebasestorage.app",
  messagingSenderId: "907015737371",
  appId: "1:907015737371:web:391cdfcb8ad5fd4691e8be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;