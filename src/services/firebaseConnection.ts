import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHBbU4i9oZLLpmbNads8IRqkF8K1MmskE",
  authDomain: "webcarrps.firebaseapp.com",
  projectId: "webcarrps",
  storageBucket: "webcarrps.appspot.com",
  messagingSenderId: "1049027392898",
  appId: "1:1049027392898:web:6a729d391538eab5b34b9b",
  measurementId: "G-W9C54GJVTK"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);