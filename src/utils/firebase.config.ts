import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD87rDcA2AE6R6qwcvghTLg5pzP8dvT8LA",
  authDomain: "editorial--manager.firebaseapp.com",
  projectId: "editorial--manager",
  storageBucket: "editorial--manager.appspot.com",
  messagingSenderId: "939323352095",
  appId: "1:939323352095:web:820198cd7b72834687a12a",
  measurementId: "G-SN5JGWKJ4J",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
