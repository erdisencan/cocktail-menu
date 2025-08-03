const allCocktails = [
  { name: "Mojito", ingredients: ["rum", "lime", "mint", "sugar"] },
  { name: "Vodka Tonic", ingredients: ["vodka", "tonic"] },
  { name: "Caipirinha", ingredients: ["cachaca", "lime", "sugar"] },
  { name: "Whiskey Sour", ingredients: ["whiskey", "lemon", "sugar"] }
];

async function fetchIngredients() {
  const res = await fetch("https://cocktail-menu-nlac2n1bf-erdis-projects-3d101cd6.vercel.app/ingredients");
  const json = await res.json();
  return json.ingredients || [];
}

async function showAvailableCocktails() {
  const availableIngredients = await fetchIngredients();
  console.log("Alınan malzemeler:", availableIngredients);
  const matching = allCocktails.filter(cocktail =>
    cocktail.ingredients.every(ing => availableIngredients.includes(ing))
  );

  const container = document.getElementById("guest-results");
  container.innerHTML = "";

  if (matching.length === 0) {
    container.textContent = "Uygun kokteyl bulunamadı 😞";
    return;
  }

  matching.forEach(c => {
    const el = document.createElement("div");
    el.textContent = c.name;
    container.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", showAvailableCocktails);
