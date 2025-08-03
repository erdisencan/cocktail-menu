// Tüm kokteyller ve gereken malzemeler
const allCocktails = [
  { name: "Mojito", ingredients: ["rum", "lime", "mint", "sugar"] },
  { name: "Vodka Tonic", ingredients: ["vodka", "tonic"] },
  { name: "Caipirinha", ingredients: ["cachaca", "lime", "sugar"] },
  { name: "Whiskey Sour", ingredients: ["whiskey", "lemon", "sugar"] }
];

// Backend'den güncel malzeme listesini al
async function fetchIngredients() {
  try {
    const res = await fetch("https://senin-backend-url.vercel.app/ingredients");
    const json = await res.json();
    return json.ingredients || [];
  } catch (error) {
    console.error("Malzeme verisi alınamadı:", error);
    return [];
  }
}

// Uygun kokteylleri göster
async function showAvailableCocktails() {
  const availableIngredients = await fetchIngredients();

  const matching = allCocktails.filter(cocktail =>
    cocktail.ingredients.every(ing => availableIngredients.includes(ing))
  );

  const resultArea = document.getElementById("guest-results");
  resultArea.innerHTML = "";

  if (matching.length === 0) {
    resultArea.textContent = "Uygun kokteyl yok 😞";
    return;
  }

  matching.forEach(cocktail => {
    const el = document.createElement("div");
    el.textContent = cocktail.name;
    resultArea.appendChild(el);
  });
}

// Sayfa açıldığında çalıştır
showAvailableCocktails();
