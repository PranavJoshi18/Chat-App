import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyARAv393sUVkXeo5JdNhwAzfXZJUxL-7wc",
  authDomain: "chat-app-fc06f.firebaseapp.com",
  projectId: "chat-app-fc06f",
  storageBucket: "chat-app-fc06f.appspot.com",
  messagingSenderId: "1096710431331",
  appId: "1:1096710431331:web:ce31442e8c252a619c8e56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();