// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAql3DRWE9loo8H7B83SvC705j8yI3tSZQ",
  authDomain: "react-journal-cc109.firebaseapp.com",
  projectId: "react-journal-cc109",
  storageBucket: "react-journal-cc109.appspot.com",
  messagingSenderId: "564773870489",
  appId: "1:564773870489:web:18c0a407ee2b059d50d108"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );//Funcionalidades de auth
export const FirebaseDB = getFirestore( FirebaseApp );//Configuración de mi DB