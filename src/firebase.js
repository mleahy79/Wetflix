// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


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
const signup = async (name, email, password)=>{
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    console.log("User created in Auth:", user.uid);

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("User document created in Firestore");
  } catch (error) {
    console.error("Signup error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}
const logout =()=> {
  signOut(auth);
}

// Helper function to add current authenticated user to Firestore
const addUserToFirestore = async (name) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is currently logged in");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name || "User",
      authProvider: "local",
      email: user.email,
    });
    console.log("User document created successfully in Firestore");
    alert("User added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    alert(`Error: ${error.message}`);
  }
}

export { app, analytics, auth, db, login, signup, logout, addUserToFirestore };
