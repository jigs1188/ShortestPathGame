import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCtZYo_fDzltyzia2OudNT2nREHaivzWZM",
  authDomain: "shortestpathgame.firebaseapp.com",
  projectId: "shortestpathgame",
  storageBucket: "shortestpathgame.firebasestorage.app",
  messagingSenderId: "790039352621",
  appId: "1:790039352621:web:a12e6c30623511c5472fa4",
  measurementId: "G-2JDX4FSPR6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


  


export { auth, firestore };
