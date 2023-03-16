import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,//"AIzaSyDlpsB3khEZZ8wmduL8crX5cRT29NN7F5Q",
  authDomain: "vkart-acf3e.firebaseapp.com",
  projectId: "vkart-acf3e",
  storageBucket: "vkart-acf3e.appspot.com",
  messagingSenderId: "786620023897",
  appId: "1:786620023897:web:0577ceb1c8b154b20cdd48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);