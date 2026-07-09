// Generates a simple fake order ID, e.g. "ORD-4821"
function generateOrderId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${randomNum}`;
}

// Runs when the checkout form is submitted
function handleCheckout(event) {
  event.preventDefault(); // stops the page from reloading (default form behavior)

  const form = document.getElementById("checkoutForm");

  // Bootstrap's built-in validation check
  if (!form.checkValidity()) {
    form.classList.add("was-validated"); // shows red borders/messages on invalid fields
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before checking out.");
    return;
  }

  const orderId = generateOrderId();
  const orderTotal = getCartTotal().toFixed(2);
  const customerName = document.getElementById("customerName").value;

// Save the completed order so the confirmation page can show it
  const order = {
    id: orderId,
    name: customerName,
    total: orderTotal,
    items: cart,
    date: new Date().toLocaleString(),
    status: "Pending" // used by the admin to track order progress
  };

  // Save as "the last order" for the confirmation page
  localStorage.setItem("lastOrder", JSON.stringify(order));

  // ALSO save it into a running list of all orders, for the admin side
  const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
  allOrders.push(order);
  localStorage.setItem("allOrders", JSON.stringify(allOrders));

  // Clear the cart now that the order is placed
  cart = [];
  saveCart();

  // Send them to the confirmation page
  window.location.href = "order-confirmation.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", handleCheckout);
});