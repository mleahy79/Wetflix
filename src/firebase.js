// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz1xE2-KS9n1yCew6JETz_vT9xBvZ_inE",
  authDomain: "wetflix-2e7f8.firebaseapp.com",
  projectId: "wetflix-2e7f8",
  storageBucket: "wetflix-2e7f8.firebasestorage.app",
  messagingSenderId: "1077351903840",
  appId: "1:1077351903840:web:1493df5ee9d400678b0905",
  measurementId: "G-3W4XDGSMKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export services to use in other files
export { app, analytics, auth, db };
