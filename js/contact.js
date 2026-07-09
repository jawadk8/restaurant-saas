function handleContactForm(event) {
  event.preventDefault();

  const form = document.getElementById("contactForm");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // No backend to actually send this anywhere — just simulate success
  document.getElementById("contactForm").classList.add("d-none");
  document.getElementById("contactSuccess").classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contactForm").addEventListener("submit", handleContactForm);
});