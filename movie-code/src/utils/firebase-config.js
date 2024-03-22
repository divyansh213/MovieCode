// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9glWhdF_WEpPtojwTLi5GVDaxrf0RHNw",
  authDomain: "moviecode-191bd.firebaseapp.com",
  projectId: "moviecode-191bd",
  storageBucket: "moviecode-191bd.appspot.com",
  messagingSenderId: "573907946643",
  appId: "1:573907946643:web:6fc6fd9bed9b0d478f5166",
  measurementId: "G-2QMMBVTDQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app); 