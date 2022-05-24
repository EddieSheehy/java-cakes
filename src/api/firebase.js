// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "year-2-software-engineering.firebaseapp.com",
  projectId: "year-2-software-engineering",
  storageBucket: "year-2-software-engineering.appspot.com",
  messagingSenderId: "43309485654",
  appId: "1:43309485654:web:0737908274d21487b3b5f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
