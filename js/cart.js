// The cart is an array of objects: { id, name, price, quantity }
// We load it from localStorage if it exists, otherwise start empty.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Always call this after changing the cart, so it's saved and persists on refresh
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
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