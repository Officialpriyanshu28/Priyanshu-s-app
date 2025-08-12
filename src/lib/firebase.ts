
import { initializeApp } from 'firebase/app';

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
const app = initializeApp(firebaseConfig);

// It's a good practice to export the app instance and other services
export { app };
