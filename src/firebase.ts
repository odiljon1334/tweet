import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoDhNtTxUz1zv2JtsjJs3B1PwMvRVoXAU",
  authDomain: "tweet-reloaded-be8a6.firebaseapp.com",
  projectId: "tweet-reloaded-be8a6",
  storageBucket: "tweet-reloaded-be8a6.firebasestorage.app",
  messagingSenderId: "382155700432",
  appId: "1:382155700432:web:2abb6ab5df0e9f4d5406d5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
