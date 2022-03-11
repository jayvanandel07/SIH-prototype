// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlyi4DxcPd776f6-w2-4PYyKALnNHzU3c",
  authDomain: "sih-1c3d0.firebaseapp.com",
  projectId: "sih-1c3d0",
  storageBucket: "sih-1c3d0.appspot.com",
  messagingSenderId: "71360362714",
  appId: "1:71360362714:web:1af6eab4e283654a9d0de3",
  measurementId: "G-GBVKH69FNH"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };
