import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

console.log("Edward CRM Loaded");

const saveBtn = document.getElementById("saveContact");

saveBtn.addEventListener("click", async () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const stage = document.getElementById("stage").value;

  try {

    await addDoc(collection(db, "contacts"), {

      name: name,
      email: email,
      phone: phone,
      stage: stage,
      createdAt: new Date()

    });

    alert("Contact Saved!");

    console.log("Saved Successfully");

  } catch(error){

    console.error(error);

  }

});
