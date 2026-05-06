import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6UFjj4ikV8kEDp-KJa553gW8CSNvYdSE",
  authDomain: "simplycalo.firebaseapp.com",
  projectId: "simplycalo",
  storageBucket: "simplycalo.firebasestorage.app",
  messagingSenderId: "760226731756",
  appId: "1:760226731756:web:b23638e7d092e8b35977c9"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);