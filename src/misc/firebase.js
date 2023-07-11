// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";


// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDrwVr2f4itPDeezluXzHwBGOZxQcqwMkA",
  authDomain: "chitchat-daf07.firebaseapp.com",
  projectId: "chitchat-daf07",
  storageBucket: "chitchat-daf07.appspot.com",
  messagingSenderId: "244313006106",
  appId: "1:244313006106:web:8ab1cc0b9587ba9f8d31a3"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();