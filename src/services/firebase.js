import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcVU10DD4-nPtLX9DYbjTN33fyRJhEj5s",
  authDomain: "rallyhub-react.firebaseapp.com",
  databaseURL: "https://rallyhub-react-default-rtdb.firebaseio.com",
  projectId: "rallyhub-react",
  storageBucket: "rallyhub-react.firebasestorage.app",
  messagingSenderId: "188880277357",
  appId: "1:188880277357:web:e6e09e6aba12643f73d464",
  measurementId: "G-S15JD4VZ1X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "productos");