// The cart is an array of objects: { id, name, price, quantity }
// We load it from localStorage if it exists, otherwise start empty.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Always call this after changing the cart, so it's saved and persists on refresh
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Shows a small stacked notification in the bottom-right corner, like
// "Spaghetti Carbonara added to cart" — auto-dismisses after a few seconds.
function showToast(message) {
  // Create the container once, and reuse it for every toast after that
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "1080";
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement("div");
  toastEl.className = "toast align-items-center text-bg-dark border-0";
  toastEl.setAttribute("role", "alert");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
  toast.show();

  // Clean up the element from the DOM once it's done hiding, so they
  // don't pile up invisibly forever
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

// Adds a dish to the cart. If it's already in there, just bump the quantity.
function addToCart(id) {
  const dish = menuItems.find(item => item.id === id);
  if (!dish) return; // safety check: dish doesn't exist

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1
    });
  }

  saveCart();
  showToast(`${dish.name} added to cart`);
}

// Removes a dish from the cart completely
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// Changes the quantity of an item (used by +/- buttons on cart page)
function updateQuantity(id, newQuantity) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  if (newQuantity <= 0) {
    removeFromCart(id);
  } else {
    item.quantity = newQuantity;
    saveCart();
  }
}

// Returns total price of everything in the cart
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Returns total number of items (for a badge/counter in navbar, later)
function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Builds the HTML for ONE row in the cart table
function createCartRow(item) {
  return `
    <tr>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.id}" data-action="decrease">−</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary qty-btn" data-id="${item.id}" data-action="increase">+</button>
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-danger remove-btn" data-id="${item.id}">Remove</button>
      </td>
    </tr>
  `;
}

// Draws the whole cart table + total, or an empty-state message
function renderCart() {
  const cartBody = document.getElementById("cartBody");
  const cartTotalEl = document.getElementById("cartTotal");
  const emptyMessage = document.getElementById("emptyCartMessage");

  if (cart.length === 0) {
    cartBody.innerHTML = "";
    emptyMessage.classList.remove("d-none");
    cartTotalEl.textContent = "$0.00";
    return;
  }

  emptyMessage.classList.add("d-none");
  cartBody.innerHTML = cart.map(createCartRow).join("");
  cartTotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// Page init + click handling for cart.html
document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cartBody");

  // Guard clause: if cartBody doesn't exist, we're not on cart.html,
  // so skip the rest of this code instead of crashing.
  if (!cartBody) return;

  renderCart();

  cartBody.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.matches(".remove-btn")) {
      removeFromCart(id);
      renderCart();
    }

    if (e.target.matches(".qty-btn")) {
      const item = cart.find(item => item.id === id);
      const action = e.target.dataset.action;
      const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;
      updateQuantity(id, newQty);
      renderCart();
    }
  });
});