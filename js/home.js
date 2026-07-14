// Picks one dish from each category to feature on the homepage
function getFeaturedDishes() {
  const categories = ["Pasta", "Pizza", "Desserts"];
  return categories
    .map(cat => menuItems.find(item => item.category === cat))
    .filter(Boolean); // removes any category with no matching dish
}

function createFeaturedCard(item) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body d-flex flex-column">
          <div class="menu-price-line">
            <span class="dish-name">${item.name}</span>
            <span class="dots"></span>
            <span class="dish-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="card-text">${item.description}</p>
          <button class="btn btn-warning mt-auto" data-id="${item.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedDishes() {
  const container = document.getElementById("featuredContainer");
  if (!container) return; // guard clause — only run this on the homepage

  const featured = getFeaturedDishes();
  container.innerHTML = featured.map(createFeaturedCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedDishes();

  const container = document.getElementById("featuredContainer");
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (e.target.matches("[data-id]")) {
      const dishId = Number(e.target.dataset.id);
      addToCart(dishId);
      alert("Added to cart!");
    }
  });
});