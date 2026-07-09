// Hardcoded mock credentials — fine for a localStorage-only demo,
// NOT how real authentication would work (no server, no encryption).
const ADMIN_USERNAME = "jawad";
const ADMIN_PASSWORD = "talha";

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;
  const errorMsg = document.getElementById("loginError");

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMsg.classList.remove("d-none");
  }
}

// Checks if the current user is logged in as admin.
// Called at the top of every protected admin page.
function requireAdminLogin() {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
}

function adminLogout() {
  localStorage.removeItem("isAdminLoggedIn");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});