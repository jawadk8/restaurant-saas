// Builds one table row for the admin menu list
function createAdminMenuRow(item) {
  return `
    <tr>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${item.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">Delete</button>
      </td>
    </tr>
  `;
}

// Draws the whole admin menu table
function renderAdminMenu() {
  const tableBody = document.getElementById("adminMenuBody");
  tableBody.innerHTML = menuItems.map(createAdminMenuRow).join("");
}

// Opens the modal in "Add" mode (empty form)
function openAddModal() {
  document.getElementById("menuForm").reset();
  document.getElementById("menuItemId").value = ""; // empty = new item
  document.getElementById("menuModalLabel").textContent = "Add Dish";
}

// Opens the modal in "Edit" mode (pre-filled form)
function openEditModal(id) {
  const item = menuItems.find(item => item.id === id);
  if (!item) return;

  document.getElementById("menuItemId").value = item.id;
  document.getElementById("menuName").value = item.name;
  document.getElementById("menuCategory").value = item.category;
  document.getElementById("menuPrice").value = item.price;
  document.getElementById("menuDescription").value = item.description;
  document.getElementById("menuModalLabel").textContent = "Edit Dish";

  // Open the modal manually, since the Edit button doesn't have
  // data-bs-toggle="modal" on it like the Add button does.
  new bootstrap.Modal(document.getElementById("menuModal")).show();
}

// Handles the Add/Edit form submission
function handleMenuFormSubmit(event) {
  event.preventDefault();

  const idValue = document.getElementById("menuItemId").value;
  const name = document.getElementById("menuName").value;
  const category = document.getElementById("menuCategory").value;
  const price = parseFloat(document.getElementById("menuPrice").value);
  const description = document.getElementById("menuDescription").value;

  if (idValue === "") {
    // ADD: no ID yet, so this is a new dish
    const newItem = {
      id: Date.now(), // simple way to get a unique number: current timestamp
      name,
      category,
      price,
      description,
      image: `https://placehold.co/300x200/cccccc/333?text=${encodeURIComponent(name)}`
    };
    menuItems.push(newItem);
  } else {
    // EDIT: find the existing item and update its fields
    const id = Number(idValue);
    const item = menuItems.find(item => item.id === id);
    item.name = name;
    item.category = category;
    item.price = price;
    item.description = description;
  }

  saveMenuItems();
  renderAdminMenu();

  // Close the modal using Bootstrap's JS API
  const modalEl = document.getElementById("menuModal");
  bootstrap.Modal.getInstance(modalEl).hide();
}

function deleteMenuItem(id) {
  if (!confirm("Delete this dish? This can't be undone.")) return;

  menuItems = menuItems.filter(item => item.id !== id);
  saveMenuItems();
  renderAdminMenu();
}

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  renderAdminMenu();

  document.getElementById("menuForm").addEventListener("submit", handleMenuFormSubmit);

  // Event delegation for Edit/Delete buttons (same pattern as cart.js)
  document.getElementById("adminMenuBody").addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.matches(".edit-btn")) {
      openEditModal(id);
    }

    if (e.target.matches(".delete-btn")) {
      deleteMenuItem(id);
    }
  });
});