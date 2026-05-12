import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyC4qnNamr8cOFADGyD0VXpkroeTts10LTg",
  authDomain: "edward-crm.firebaseapp.com",
  projectId: "edward-crm",
  storageBucket: "edward-crm.firebasestorage.app",
  messagingSenderId: "150269087365",
  appId: "1:150269087365:web:a55598b601e9e6da0463ec"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firebase Connected");

export { db };
