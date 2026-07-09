// This function builds the HTML for ONE dish card.
// We keep it separate so we can reuse it for every item in the array.
function createDishCard(item) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="fw-bold">$${item.price.toFixed(2)}</p>
          <button class="btn btn-warning mt-auto" data-id="${item.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// This function takes an array of dishes and draws them into the page.
function renderMenu(items) {
  const menuContainer = document.getElementById("menuContainer");
  menuContainer.innerHTML = items.map(createDishCard).join("");
}

// This function filters menuItems by category ("All", "Pasta", "Pizza", "Desserts")
function filterMenu(category) {
  if (category === "All") {
    renderMenu(menuItems);
  } else {
    const filtered = menuItems.filter(item => item.category === category);
    renderMenu(filtered);
  }
}

// Runs once the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(menuItems); // show everything by default

  // Listen for clicks on any filter button
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterMenu(btn.dataset.category);
    });
  });

  // Listen for clicks on "Add to Cart" buttons.
  // We attach ONE listener to the container instead of one per button,
  // because the cards get re-rendered every time we filter — old listeners
  // would be lost, but this way it always works no matter what's inside.
  const menuContainer = document.getElementById("menuContainer");
  menuContainer.addEventListener("click", (e) => {
    if (e.target.matches("[data-id]")) {
      const dishId = Number(e.target.dataset.id);
      addToCart(dishId);
      alert("Added to cart!"); // temporary — we'll replace with a nicer toast later
    }
  });
});