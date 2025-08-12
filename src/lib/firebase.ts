
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "skillzup-z0dj5",
  "appId": "1:493117735774:web:1a8808c134f897130485cf",
  "storageBucket": "skillzup-z0dj5.firebasestorage.app",
  "apiKey": "AIzaSyCOo9HVhMExiRYZEdJy_JdXmFWBWLs10T4",
  "authDomain": "skillzup-z0dj5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "493117735774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// It's a good practice to export the app instance and other services
export { app };
