import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "PASTE_YOURS",
  authDomain: "PASTE_YOURS",
  projectId: "PASTE_YOURS",
  storageBucket: "PASTE_YOURS",
  messagingSenderId: "PASTE_YOURS",
  appId: "PASTE_YOURS"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firebase Connected");

export { db };
