// Load existing reservations, or start with an empty array
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

function saveReservations() {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

// Generates a simple fake reservation ID, e.g. "RES-2381"
function generateReservationId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `RES-${randomNum}`;
}

function handleReservation(event) {
  event.preventDefault();

  const form = document.getElementById("reservationForm");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const dateValue = document.getElementById("resDate").value;
  const today = new Date().toISOString().split("T")[0]; // today's date as "YYYY-MM-DD"

  // Extra check beyond basic "required": date can't be in the past
  if (dateValue < today) {
    alert("Please choose a date that hasn't already passed.");
    return;
  }

  const reservation = {
    id: generateReservationId(),
    name: document.getElementById("resName").value,
    guests: document.getElementById("resGuests").value,
    date: dateValue,
    time: document.getElementById("resTime").value,
    status: "Pending" // used later on the admin side
  };

  reservations.push(reservation);
  saveReservations();

  // Show a success message instead of redirecting
  document.getElementById("reservationForm").classList.add("d-none");
  document.getElementById("reservationSuccess").classList.remove("d-none");
  document.getElementById("successResId").textContent = reservation.id;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  form.addEventListener("submit", handleReservation);

  // Prevents picking a date before today in the date picker itself
  document.getElementById("resDate").min = new Date().toISOString().split("T")[0];
});