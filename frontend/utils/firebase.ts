
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-agent-f00da.firebaseapp.com",
  projectId: "multi-agent-f00da",
  storageBucket: "multi-agent-f00da.firebasestorage.app",
  messagingSenderId: "789751194721",
  appId: "1:789751194721:web:5cc13400eb4d22faa4b620",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
