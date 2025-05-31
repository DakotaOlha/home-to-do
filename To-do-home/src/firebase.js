import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAGzmUomE3yjyG25q9r-j9J89Z8e0-e6k0",
  authDomain: "to-do-home-1ade6.firebaseapp.com",
  projectId: "to-do-home-1ade6",
  storageBucket: "to-do-home-1ade6.firebasestorage.app",
  messagingSenderId: "461180076223",
  appId: "1:461180076223:web:46e5458d261f10fe14860a",
  measurementId: "G-S3KWQM51T2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {
  auth,
  db,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
}