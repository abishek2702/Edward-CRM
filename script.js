import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

console.log("Edward CRM Loaded");

const saveBtn = document.getElementById("saveContact");
const contactTable = document.getElementById("contactTable");

async function loadContacts() {

  contactTable.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "contacts"));

  querySnapshot.forEach((doc) => {

    const contact = doc.data();
const id = doc.id;
    const row = `
     <tr>

  <td>${contact.name || ""}</td>

  <td>${contact.email || ""}</td>

  <td>${contact.phone || ""}</td>

  <td>
    <span class="stage ${contact.stage.toLowerCase().replace(" ","-")}">
      ${contact.stage || ""}
    </span>
  </td>

  <td>
    <button class="delete-btn" data-id="${id}">
      Delete
    </button>
  </td>

</tr>
    `;

    contactTable.innerHTML += row;

  });

}

loadContacts();

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

    loadContacts();

  } catch (error) {

    console.error(error);

  }

});
document.addEventListener("click", async (e) => {

  if(e.target.classList.contains("delete-btn")){

    const id = e.target.dataset.id;

    await deleteDoc(doc(db, "contacts", id));

    loadContacts();

  }

});
