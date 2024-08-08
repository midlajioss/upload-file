import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArO48QkRaNy3ZSVsC4FjII7hr6Wgkx58w",
  authDomain: "sample-9e0cd.firebaseapp.com",
  projectId: "sample-9e0cd",
  storageBucket: "sample-9e0cd.appspot.com",
  messagingSenderId: "378862195056",
  appId: "1:378862195056:web:3161ecb667049a5611ffb5",
  measurementId: "G-187KE9EGEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db , storage };