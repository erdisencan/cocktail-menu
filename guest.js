const cocktails = [
  {
    name: "Mojito",
    ingredients: ["rum", "lime", "mint", "sugar"]
  },
  {
    name: "Vodka Tonic",
    ingredients: ["vodka", "tonic"]
  },
  {
    name: "Caipirinha",
    ingredients: ["cachaca", "lime", "sugar"]
  },
  {
    name: "Whiskey Sour",
    ingredients: ["whiskey", "lemon", "sugar"]
  }
];

async function fetchIngredients() {
  try {
    const res = await fetch("https://senin-backend-url/ingredients");
    const json = await res.json();
    return json.ingredients;
  } catch (error) {
    console.error("Malzeme verisi alınamadı:", error);
    return [];
  }
}


async function showCocktails() {
  const ingredients = await fetchIngredients();
  const matchedCocktails = cocktails.filter(cocktail =>
    cocktail.ingredients.every(ing => ingredients.includes(ing))
  );

  const container = document.getElementById("cocktailList");
  container.innerHTML = "";

  if (matchedCocktails.length === 0) {
    container.innerHTML = "<p>Uygun kokteyl bulunamadı.</p>";
    return;
  }

  matchedCocktails.forEach(cocktail => {
    const item = document.createElement("div");
    item.className = "cocktail";
    item.textContent = cocktail.name;
    container.appendChild(item);
  });
}

showCocktails();
