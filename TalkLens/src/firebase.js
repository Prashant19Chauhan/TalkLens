// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzwh9w9qkMXyAr0RHBYw-jm0Ko68WE6IE",
  authDomain: "talklens-1b524.firebaseapp.com",
  projectId: "talklens-1b524",
  storageBucket: "talklens-1b524.firebasestorage.app",
  messagingSenderId: "169235141722",
  appId: "1:169235141722:web:e26b67b4cdb766376bf463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const OAuthProvider = new GoogleAuthProvider();

export { app, auth, db, OAuthProvider };