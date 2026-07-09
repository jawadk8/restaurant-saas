// Loads orders fresh from localStorage every time (so it's always up to date)
function getAllOrders() {
  return JSON.parse(localStorage.getItem("allOrders")) || [];
}

function saveAllOrders(orders) {
  localStorage.setItem("allOrders", JSON.stringify(orders));
}

// Returns a Bootstrap color class based on status, for a colored badge
function getStatusBadgeClass(status) {
  if (status === "Pending") return "bg-secondary";
  if (status === "Preparing") return "bg-warning text-dark";
  if (status === "Completed") return "bg-success";
  return "bg-secondary";
}

// Builds one table row for one order
function createOrderRow(order) {
  return `
    <tr>
      <td>${order.id}</td>
      <td>${order.name}</td>
      <td>$${order.total}</td>
      <td>${order.date}</td>
      <td><span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span></td>
      <td>
        <select class="form-select form-select-sm status-select" data-id="${order.id}">
          <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Preparing" ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
          <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-dark view-items-btn" data-id="${order.id}">View Items</button>
      </td>
    </tr>
  `;
}

function renderOrders() {
  const orders = getAllOrders();
  const tableBody = document.getElementById("ordersBody");
  const emptyMessage = document.getElementById("noOrdersMessage");

  if (orders.length === 0) {
    tableBody.innerHTML = "";
    emptyMessage.classList.remove("d-none");
    return;
  }

  emptyMessage.classList.add("d-none");
  tableBody.innerHTML = orders.map(createOrderRow).join("");
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  saveAllOrders(orders);
  renderOrders(); // re-render so the badge color updates too
}

// Shows a popup listing what was in a specific order
function viewOrderItems(orderId) {
  const orders = getAllOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const itemLines = order.items
    .map(item => `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`)
    .join("\n");

  alert(`Order ${order.id} — Items:\n\n${itemLines}\n\nTotal: $${order.total}`);
}

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  renderOrders();

  document.getElementById("ordersBody").addEventListener("change", (e) => {
    if (e.target.matches(".status-select")) {
      const orderId = e.target.dataset.id; // order IDs are strings like "ORD-4821"
      updateOrderStatus(orderId, e.target.value);
    }
  });

  document.getElementById("ordersBody").addEventListener("click", (e) => {
    if (e.target.matches(".view-items-btn")) {
      const orderId = e.target.dataset.id;
      viewOrderItems(orderId);
    }
  });
});