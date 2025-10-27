import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Use Vite env vars when present; otherwise fall back to the provided Firebase config.
// NOTE: For production it's recommended to store secrets in env vars instead of embedding them.
const firebaseConfig = {
  apiKey:
    (import.meta.env.VITE_FIREBASE_API_KEY as string) ??
    "AIzaSyAVvqV5TyskRcSKl1ywHr_F19haK_eMhHw",
  authDomain:
    (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) ??
    "ai-note-taker-c8797.firebaseapp.com",
  projectId:
    (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) ??
    "ai-note-taker-c8797",
  storageBucket:
    (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) ??
    "ai-note-taker-c8797.firebasestorage.app",
  messagingSenderId:
    (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) ??
    "195967706201",
  appId:
    (import.meta.env.VITE_FIREBASE_APP_ID as string) ??
    "1:195967706201:web:407a2e9a3e91c87fe47d48",
  measurementId:
    (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string) ?? "G-TX11087W79",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
