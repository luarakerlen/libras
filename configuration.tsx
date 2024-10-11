// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFnzGnDuQZve5l-577t2peXef1vXiS03E",
  authDomain: "libras-eac54.firebaseapp.com",
  projectId: "libras-eac54",
  storageBucket: "libras-eac54.appspot.com",
  messagingSenderId: "573313749174",
  appId: "1:573313749174:web:4b75592a70b69712d45617"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;