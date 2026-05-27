// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpoIbRG0fZ6BPLLjYKu2zQTb6paOy9d_8",
  authDomain: "react-firebase-project-d2f6e.firebaseapp.com",
  projectId: "react-firebase-project-d2f6e",
  storageBucket: "react-firebase-project-d2f6e.firebasestorage.app",
  messagingSenderId: "1034362925345",
  appId: "1:1034362925345:web:2ec2fce968e89600158e60",
  measurementId: "G-TNCZWH7PBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const analytics = getAnalytics(app);