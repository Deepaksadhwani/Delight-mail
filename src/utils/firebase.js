// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM06HKspf8q541DdZPs1PiqDiwdIUPuEM",
  authDomain: "deepak-mailbox-client.firebaseapp.com",
  projectId: "deepak-mailbox-client",
  storageBucket: "deepak-mailbox-client.appspot.com",
  messagingSenderId: "198640199490",
  appId: "1:198640199490:web:e1bc910899db15226fcadb",
  measurementId: "G-R0F1BLFC7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);