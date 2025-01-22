// src/firebaseConfig.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZYo_fDzltyzia2OudNT2nREHaivzWZM",
  authDomain: "shortestpathgame.firebaseapp.com",
  projectId: "shortestpathgame",
  storageBucket: "shortestpathgame.firebasestorage.app",
  messagingSenderId: "790039352621",
  appId: "1:790039352621:web:a12e6c30623511c5472fa4",
  measurementId: "G-2JDX4FSPR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
