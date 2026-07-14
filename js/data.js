// This is our "seed" data — used only the FIRST time someone visits,
// to populate localStorage. After that, localStorage is the real source of truth.
const defaultMenuItems = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    price: 12.99,
    description: "Classic Roman pasta with egg, pancetta, and pecorino cheese.",
    image: "assets/images/spaghetti-carbonara.jpg"
  },
  {
    id: 2,
    name: "Fettuccine Alfredo",
    category: "Pasta",
    price: 11.49,
    description: "Creamy parmesan sauce tossed with fresh fettuccine.",
    image: "assets/images/fettuccine-alfredo.webp"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 13.99,
    description: "San Marzano tomatoes, fresh mozzarella, and basil.",
    image: "assets/images/margheritta-pizza.webp"
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 14.99,
    description: "Loaded with pepperoni and mozzarella on a crispy crust.",
    image: "assets/images/pepperoni-pizza.webp"
  },
  {
    id: 5,
    name: "Tiramisu",
    category: "Desserts",
    price: 7.49,
    description: "Espresso-soaked ladyfingers layered with mascarpone cream.",
    image: "assets/images/tiramisu.jpg"
  },
  {
    id: 6,
    name: "Panna Cotta",
    category: "Desserts",
    price: 6.99,
    description: "Silky vanilla cream topped with a berry compote.",
    image: "assets/images/panna-cotta.jpg"
  }
];

// Load menuItems from localStorage. If nothing's saved yet (first-ever visit),
// fall back to defaultMenuItems AND save that as the starting point.
let menuItems = JSON.parse(localStorage.getItem("menuItems")) || defaultMenuItems;

if (!localStorage.getItem("menuItems")) {
  localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// Call this any time menuItems is changed (add/edit/delete a dish)
function saveMenuItems() {
  localStorage.setItem("menuItems", JSON.stringify(menuItems));
}