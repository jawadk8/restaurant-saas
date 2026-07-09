function loadDashboardStats() {
  const orders = JSON.parse(localStorage.getItem("allOrders")) || [];
  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const pendingOrders = orders.filter(order => order.status === "Pending").length;

  document.getElementById("statTotalOrders").textContent = orders.length;
  document.getElementById("statPendingOrders").textContent = pendingOrders;
  document.getElementById("statTotalReservations").textContent = reservations.length;
  document.getElementById("statTotalRevenue").textContent = `$${totalRevenue.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin(); // gatekeeper — redirects to login.html if not logged in
  loadDashboardStats();
});