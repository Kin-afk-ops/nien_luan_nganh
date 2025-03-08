// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWMlTeFbOwHORTgkATiaUTaOsbmgNgA5k",
  authDomain: "otp-project-57c17.firebaseapp.com",
  projectId: "otp-project-57c17",
  storageBucket: "otp-project-57c17.firebasestorage.app",
  messagingSenderId: "630406329835",
  appId: "1:630406329835:web:c8f2987dd0b49ad63055ae",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, RecaptchaVerifier, googleProvider, facebookProvider };
