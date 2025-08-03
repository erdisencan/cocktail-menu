let selectedIngredients = [];

// Sayfa yüklendiğinde backend'den önceki malzemeleri getir
async function loadIngredientsFromBackend() {
  try {
    const res = await fetch("https://senin-backend-url.vercel.app/ingredients");
    const json = await res.json();
    selectedIngredients = json.ingredients || [];

    // Checkboxları güncelle
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = selectedIngredients.includes(cb.value);
    });

    updateCocktailList();
  } catch (error) {
    console.error("Malzemeleri backend'den alma hatası:", error);
  }
}

// Seçim değişince backend'e gönder
async function saveIngredientsToBackend(ingredients) {
  try {
    const res = await fetch("https://senin-backend-url.vercel.app/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    });
    console.log("Backend'e kaydedildi:", ingredients);
  } catch (error) {
    console.error("Backend'e kaydedilemedi:", error);
  }
}

// Seçilen malzemeleri güncelle
function updateSelectedIngredients() {
  selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value);

  saveIngredientsToBackend(selectedIngredients);
  updateCocktailList();
}

// Kokteyl listesini güncelle (örnek filtreleme)
function updateCocktailList() {
  const allCocktails = [
    { name: "Mojito", ingredients: ["rum", "lime", "mint", "sugar"] },
    { name: "Vodka Tonic", ingredients: ["vodka", "tonic"] },
    { name: "Caipirinha", ingredients: ["cachaca", "lime", "sugar"] },
    { name: "Whiskey Sour", ingredients: ["whiskey", "lemon", "sugar"] }
  ];

  const resultArea = document.getElementById("cocktail-results");
  resultArea.innerHTML = "";

  const matching = allCocktails.filter(cocktail =>
    cocktail.ingredients.every(ing => selectedIngredients.includes(ing))
  );

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

// Tüm checkboxlara dinleyici ekle
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener("change", updateSelectedIngredients);
});

// Sayfa açıldığında backend'den veri çek
loadIngredientsFromBackend();
