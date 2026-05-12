import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* ---------------- ELEMENTS ---------------- */

const navButtons =
document.querySelectorAll(".nav-btn");

const pages =
document.querySelectorAll(".page");

/* MODALS */

const contactModal =
document.getElementById("contactModal");

const vendorModal =
document.getElementById("vendorModal");

const soiModal =
document.getElementById("soiModal");

/* OPEN BUTTONS */

const openContactModalBtn =
document.getElementById("openContactModalBtn");

const openVendorModalBtn =
document.getElementById("openVendorModalBtn");

const openSOIModalBtn =
document.getElementById("openSOIModalBtn");

/* SAVE BUTTONS */

const saveContactBtn =
document.getElementById("saveContactBtn");

const saveVendorBtn =
document.getElementById("saveVendorBtn");

const saveSOIBtn =
document.getElementById("saveSOIBtn");

/* TABLES */

const contactTable =
document.getElementById("contactTable");

const soiTable =
document.getElementById("soiTable");

const vendorsTable =
document.getElementById("vendorsTable");

/* PIPELINES */

const pendingPipeline =
document.getElementById("pendingPipeline");

const closingPipeline =
document.getElementById("closingPipeline");

const pastPipeline =
document.getElementById("pastPipeline");

/* DASHBOARD */

const recentContacts =
document.getElementById("recentContacts");

const tasksList =
document.getElementById("tasksList");

const activeLeadsCount =
document.getElementById("activeLeadsCount");

const closingCount =
document.getElementById("closingCount");

const pendingCount =
document.getElementById("pendingCount");

const pastClientsCount =
document.getElementById("pastClientsCount");

/* SMART LISTS */

const mortgageList =
document.getElementById("mortgageList");

const realtorList =
document.getElementById("realtorList");

/* PROFILE */

const profilePanel =
document.getElementById("profilePanel");

const profileContent =
document.getElementById("profileContent");

const closeProfileBtn =
document.getElementById("closeProfileBtn");

/* SEARCH */

const searchInput =
document.getElementById("searchInput");

/* ---------------- DATA ---------------- */

let allContacts = [];

/* ---------------- NAVIGATION ---------------- */

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    navButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const page =
    button.dataset.page;

    pages.forEach(section => {
      section.classList.add("hidden");
    });

    document
      .getElementById(`${page}Page`)
      .classList.remove("hidden");

  });

});

/* ---------------- OPEN MODALS ---------------- */

openContactModalBtn?.addEventListener("click", () => {

  contactModal.classList.remove("hidden");

});

openVendorModalBtn?.addEventListener("click", () => {

  vendorModal.classList.remove("hidden");

});

openSOIModalBtn?.addEventListener("click", () => {

  soiModal.classList.remove("hidden");

});

/* ---------------- CLOSE MODALS ---------------- */

document
.querySelectorAll(".closeModalBtn")
.forEach(btn => {

  btn.addEventListener("click", () => {

    contactModal.classList.add("hidden");

    vendorModal.classList.add("hidden");

    soiModal.classList.add("hidden");

  });

});

closeProfileBtn?.addEventListener("click", () => {

  profilePanel.classList.add("hidden");

});

/* ---------------- SAVE CONTACT ---------------- */

saveContactBtn?.addEventListener("click", async () => {

  const data = {

    type:"Contact",

    contactType:"Lead",

    name:
    document.getElementById("contactName").value,

    email:
    document.getElementById("contactEmail").value,

    phone:
    document.getElementById("contactPhone").value,

    notes:
    document.getElementById("contactNotes").value,

    stage:
    document.getElementById("contactStage").value,

    lastActivity:
    new Date().toISOString(),

    createdAt:
    new Date().toISOString()

  };

  await addDoc(
    collection(db,"contacts"),
    data
  );

  contactModal.classList.add("hidden");

  loadContacts();

});

/* ---------------- SAVE VENDOR ---------------- */

saveVendorBtn?.addEventListener("click", async () => {

  const data = {

    type:"Vendor",

    contactType:"Vendor",

    name:
    document.getElementById("vendorName").value,

    email:
    document.getElementById("vendorEmail").value,

    phone:
    document.getElementById("vendorPhone").value,

    vendorType:
    document.getElementById("vendorType").value,

    notes:
    document.getElementById("vendorNotes").value,

    createdAt:
    new Date().toISOString()

  };

  await addDoc(
    collection(db,"contacts"),
    data
  );

  vendorModal.classList.add("hidden");

  loadContacts();

});

/* ---------------- SAVE SOI ---------------- */

saveSOIBtn?.addEventListener("click", async () => {

  const data = {

    type:"SOI",

    contactType:"SOI",

    name:
    document.getElementById("soiName").value,

    relationship:
    document.getElementById("soiRelationship").value,

    phone:
    document.getElementById("soiPhone").value,

    notes:
    document.getElementById("soiNotes").value,

    createdAt:
    new Date().toISOString()

  };

  await addDoc(
    collection(db,"contacts"),
    data
  );

  soiModal.classList.add("hidden");

  loadContacts();

});

/* ---------------- LOAD ---------------- */

async function loadContacts(){

  allContacts = [];

  contactTable.innerHTML = "";

  soiTable.innerHTML = "";

  vendorsTable.innerHTML = "";

  pendingPipeline.innerHTML = "";

  closingPipeline.innerHTML = "";

  pastPipeline.innerHTML = "";

  recentContacts.innerHTML = "";

  tasksList.innerHTML = "";

  mortgageList.innerHTML = "";

  realtorList.innerHTML = "";

  const querySnapshot =
  await getDocs(collection(db,"contacts"));

  querySnapshot.forEach((firebaseDoc) => {

    const contact =
    firebaseDoc.data();

    contact.id =
    firebaseDoc.id;

    allContacts.push(contact);

  });

  renderDashboard();

  renderContacts();

  renderSOI();

  renderVendors();

  renderPipelines();

  renderSmartLists();

}

/* ---------------- DASHBOARD ---------------- */

function renderDashboard(){

  activeLeadsCount.innerText =
  allContacts.length;

  closingCount.innerText =
  allContacts.filter(c =>
    (c.stage || "Pending") === "Closing"
  ).length;

  pendingCount.innerText =
  allContacts.filter(c =>
    (c.stage || "Pending") === "Pending"
  ).length;

  pastClientsCount.innerText =
  allContacts.filter(c =>
    (c.stage || "Pending") === "Past Client"
  ).length;

  recentContacts.innerHTML = "";

  [...allContacts]
  .slice(-5)
  .reverse()
  .forEach(contact => {

    recentContacts.innerHTML += `

      <div class="recent-contact">

        <div>

          <h4>${contact.name || "-"}</h4>

          <p>${contact.email || ""}</p>

        </div>

      </div>

    `;

  });

}

/* ---------------- CONTACTS ---------------- */

function renderContacts(){

  contactTable.innerHTML = "";

  const contacts =
  allContacts.filter(c =>

    c.type === "Contact"

    ||

    c.contactType === "Lead"

    ||

    (!c.type && !c.contactType)

  );

  contacts.forEach(contact => {

    const stage =
    contact.stage || "Pending";

    const activity =
    contact.lastActivity
    ? new Date(contact.lastActivity)
      .toLocaleDateString()
    : "-";

    contactTable.innerHTML += `

      <tr
        class="contact-row"
        onclick="openProfile('${contact.id}')"
      >

        <td>${contact.name || "-"}</td>

        <td>${contact.email || "-"}</td>

        <td>${contact.phone || "-"}</td>

        <td>

          <span class="stage ${stage.toLowerCase().replace(' ','-')}">

            ${stage}

          </span>

        </td>

        <td>${activity}</td>

        <td>

          <button
            class="delete-btn"
            onclick="deleteContact(event,'${contact.id}')"
          >
            Delete
          </button>

        </td>

      </tr>

    `;

  });

}

/* ---------------- SOI ---------------- */

function renderSOI(){

  soiTable.innerHTML = "";

  const soi =
  allContacts.filter(c =>

    c.type === "SOI"

    ||

    c.contactType === "SOI"

  );

  soi.forEach(contact => {

    soiTable.innerHTML += `

      <tr>

        <td>${contact.name || "-"}</td>

        <td>${contact.relationship || "-"}</td>

        <td>${contact.phone || "-"}</td>

      </tr>

    `;

  });

}

/* ---------------- VENDORS ---------------- */

function renderVendors(){

  vendorsTable.innerHTML = "";

  const vendors =
  allContacts.filter(c =>

    c.type === "Vendor"

    ||

    c.contactType === "Vendor"

  );

  vendors.forEach(contact => {

    vendorsTable.innerHTML += `

      <tr>

        <td>${contact.name || "-"}</td>

        <td>${contact.vendorType || "-"}</td>

        <td>${contact.phone || "-"}</td>

        <td>${contact.email || "-"}</td>

      </tr>

    `;

  });

}

/* ---------------- PIPELINES ---------------- */

function renderPipelines(){

  pendingPipeline.innerHTML = "";

  closingPipeline.innerHTML = "";

  pastPipeline.innerHTML = "";

  const contacts =
  allContacts.filter(c =>

    c.type === "Contact"

    ||

    c.contactType === "Lead"

    ||

    (!c.type && !c.contactType)

  );

  contacts.forEach(contact => {

    const stage =
    contact.stage || "Pending";

    const card = `

      <div
        class="pipeline-card"
        onclick="openProfile('${contact.id}')"
      >

        <h3>${contact.name || "-"}</h3>

        <p>${contact.email || ""}</p>

      </div>

    `;

    if(stage === "Pending"){

      pendingPipeline.innerHTML += card;

    }

    else if(stage === "Closing"){

      closingPipeline.innerHTML += card;

    }

    else{

      pastPipeline.innerHTML += card;

    }

  });

}

/* ---------------- SMART LISTS ---------------- */

function renderSmartLists(){

  if(mortgageList){
    mortgageList.innerHTML = "";
  }

  if(realtorList){
    realtorList.innerHTML = "";
  }

  if(inspectorList){
    inspectorList.innerHTML = "";
  }

  if(plumberList){
    plumberList.innerHTML = "";
  }

  const vendors =
  allContacts.filter(contact =>

    contact.type === "Vendor"

    ||

    contact.contactType === "Vendor"

  );

  vendors.forEach(vendor => {

    const vendorType =
    (vendor.vendorType || "")
    .toLowerCase()
    .trim()
    .replace(/\s/g,'');

    const item = `

      <div class="upcoming-item">

        <strong>${vendor.name || "-"}</strong>

        <br><br>

        ${vendor.vendorType || "-"}

      </div>

    `;

    console.log(vendorType);

    if(vendorType.includes("mortgage")){

      mortgageList.innerHTML += item;

    }

    else if(

      vendorType.includes("realestate")

      ||

      vendorType.includes("realtor")

      ||

      vendorType.includes("agent")

    ){

      realtorList.innerHTML += item;

    }

    else if(vendorType.includes("inspector")){

      inspectorList.innerHTML += item;

    }

    else if(vendorType.includes("plumb")){

      plumberList.innerHTML += item;

    }

  });

}

    /* INSPECTOR */

    else if(type.includes("inspector")){

      if(inspectorList){

        inspectorList.innerHTML += item;

      }

    }

    /* PLUMBING */

    else if(type.includes("plumb")){

      if(plumberList){

        plumberList.innerHTML += item;

      }

    }

  });

}

/* ---------------- PROFILE ---------------- */

window.openProfile = function(id){

  const contact =
  allContacts.find(c => c.id === id);

  if(!contact) return;

  profileContent.innerHTML = `

    <div class="profile-card">

      <h3>${contact.name || "-"}</h3>

      <div class="profile-section">

        <label>Type</label>

        <p>${contact.type || contact.contactType || "-"}</p>

      </div>

      <div class="profile-section">

        <label>Phone</label>

        <p>${contact.phone || "-"}</p>

      </div>

      <div class="profile-section">

        <label>Email</label>

        <p>${contact.email || "-"}</p>

      </div>

      <div class="profile-section">

        <label>Notes</label>

        <div class="profile-notes">

          ${contact.notes || "No notes"}

        </div>

      </div>

    </div>

  `;

  profilePanel.classList.remove("hidden");

}

/* ---------------- DELETE ---------------- */

window.deleteContact =
async function(event,id){

  event.stopPropagation();

  await deleteDoc(doc(db,"contacts",id));

  loadContacts();

}

/* ---------------- SEARCH ---------------- */

searchInput?.addEventListener("input", () => {

  const value =
  searchInput.value.toLowerCase();

  contactTable.innerHTML = "";

  const contacts =
  allContacts.filter(c =>

    c.type === "Contact"

    ||

    c.contactType === "Lead"

  );

  const filtered =
  contacts.filter(contact =>

    contact.name?.toLowerCase().includes(value)

  );

  filtered.forEach(contact => {

    contactTable.innerHTML += `

      <tr>

        <td>${contact.name || "-"}</td>

        <td>${contact.email || "-"}</td>

        <td>${contact.phone || "-"}</td>

        <td>${contact.stage || "-"}</td>

        <td>-</td>

        <td></td>

      </tr>

    `;

  });

});

/* ---------------- INITIAL ---------------- */

loadContacts();