// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcVU10DD4-nPtLX9DYbjTN33fyRJhEj5s",
  authDomain: "rallyhub-react.firebaseapp.com",
  projectId: "rallyhub-react",
  storageBucket: "rallyhub-react.firebasestorage.app",
  messagingSenderId: "188880277357",
  appId: "1:188880277357:web:e6e09e6aba12643f73d464",
  measurementId: "G-S15JD4VZ1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);