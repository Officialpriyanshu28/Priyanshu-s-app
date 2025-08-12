
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOo9HVhMExiRYZEdJy_JdXmFWBWLs10T4",
  authDomain: "skillzup-z0dj5.firebaseapp.com",
  databaseURL: "https://skillzup-z0dj5-default-rtdb.firebaseio.com",
  projectId: "skillzup-z0dj5",
  storageBucket: "skillzup-z0dj5.firebasestorage.app",
  messagingSenderId: "493117735774",
  appId: "1:493117735774:web:8ede8ed69d4790980485cf"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);


// It's a good practice to export the app instance and other services
export { app, auth, db };
