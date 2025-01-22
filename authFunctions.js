import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { sendEmailVerification  } from 'firebase/auth';
import { doc, setDoc, getFirestore ,firestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const db = getFirestore();

export const signUpWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    verified: false,
    level: 0, // First level
  });
};

export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Save OTP to Firestore with a timestamp
  await firestore().collection('otps').doc(email).set({
    otp,
    timestamp: firestore.FieldValue.serverTimestamp(),
  });
  // Send OTP via email (implement via Firebase Cloud Functions)
  await sendPasswordResetEmail(auth, email);
};

export const verifyOTP = async (email, otp) => {
  const otpDoc = await firestore().collection('otps').doc(email).get();
  if (!otpDoc.exists) {
    throw new Error('OTP not found');
  }

  const { otp: storedOtp, timestamp } = otpDoc.data();
  const currentTime = firestore.Timestamp.now();
  const otpAge = currentTime.seconds - timestamp.seconds;

  if (otpAge > 300) { // OTP is valid for 5 minutes (300 seconds)
    throw new Error('OTP expired');
  }

  if (storedOtp !== otp) {
    throw new Error('Invalid OTP');
  }

  // If OTP is valid, delete it from Firestore
  await firestore().collection('otps').doc(email).delete();
  return true;
};


export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
