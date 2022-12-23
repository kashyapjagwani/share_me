import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDkAzz4phC5CSVCAIRKfH-tvQebprQSekM",
//   authDomain: "share-me-database.firebaseapp.com",
//   projectId: "share-me-database",
//   storageBucket: "share-me-database.appspot.com",
//   messagingSenderId: "752666709988",
//   appId: "1:752666709988:web:83ce550f560a36741a41f1",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const projectFirestore = firebase.firestore();
// const auth = firebase.auth();
// const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, storage };
