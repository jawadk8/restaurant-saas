// Loads reservations fresh from localStorage every time
function getAllReservations() {
  return JSON.parse(localStorage.getItem("reservations")) || [];
}

function saveAllReservations(reservations) {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

// Returns a Bootstrap color class based on status, for a colored badge
function getReservationBadgeClass(status) {
  if (status === "Pending") return "bg-secondary";
  if (status === "Confirmed") return "bg-success";
  if (status === "Cancelled") return "bg-danger";
  return "bg-secondary";
}

// Builds one table row for one reservation
function createReservationRow(res) {
  return `
    <tr>
      <td>${res.id}</td>
      <td>${res.name}</td>
      <td>${res.guests}</td>
      <td>${res.date}</td>
      <td>${res.time}</td>
      <td><span class="badge ${getReservationBadgeClass(res.status)}">${res.status}</span></td>
      <td>
        <select class="form-select form-select-sm res-status-select" data-id="${res.id}">
          <option value="Pending" ${res.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Confirmed" ${res.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Cancelled" ${res.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
    </tr>
  `;
}

function renderReservations() {
  const reservations = getAllReservations();
  const tableBody = document.getElementById("reservationsBody");
  const emptyMessage = document.getElementById("noReservationsMessage");

  if (reservations.length === 0) {
    tableBody.innerHTML = "";
    emptyMessage.classList.remove("d-none");
    return;
  }

  emptyMessage.classList.add("d-none");
  tableBody.innerHTML = reservations.map(createReservationRow).join("");
}

function updateReservationStatus(resId, newStatus) {
  const reservations = getAllReservations();
  const res = reservations.find(r => r.id === resId);
  if (!res) return;

  res.status = newStatus;
  saveAllReservations(reservations);
  renderReservations();
}

document.addEventListener("DOMContentLoaded", () => {
  requireAdminLogin();
  renderReservations();

  document.getElementById("reservationsBody").addEventListener("change", (e) => {
    if (e.target.matches(".res-status-select")) {
      const resId = e.target.dataset.id;
      updateReservationStatus(resId, e.target.value);
    }
  });
});