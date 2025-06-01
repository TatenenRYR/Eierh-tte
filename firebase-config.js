import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAu39z49KEJy9zso-etFIScmaFnWw8vhro",
  authDomain: "eierhuettentour.firebaseapp.com",
  projectId: "eierhuettentour",
  storageBucket: "eierhuettentour.firebasestorage.app",
  messagingSenderId: "348272135205",
  appId: "1:348272135205:web:f39a7d26d927fbf28dc3cc",
  measurementId: "G-16V6K5GXDT"
};

// Initialisierung
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const huettenRef = collection(db, "neue_huetten");
