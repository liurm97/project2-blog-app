// Import the functions from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_API_KEY,
  authDomain: import.meta.env.VITE_SOME_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_SOME_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SOME_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SOME_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SOME_APP_ID,
  databaseURL: import.meta.env.VITE_SOME_DATABASE_URL,
};

// Initialize Firebase with the project configuration
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);

// PLACEHOLDERS TO USE REALTIME DB & STORAGE

export const database = getDatabase(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
