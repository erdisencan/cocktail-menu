// Örnek malzeme listesi (checkbox ya da başka inputlarla seçiliyor)
let selectedIngredients = [];

// Bu fonksiyon checkboxlardan seçilen malzemeleri alır
function updateSelectedIngredients() {
  selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value);
  
  // Malzeme listesi güncellendiğinde backend'e gönder
  saveIngredientsToBackend(selectedIngredients);

  // UI için yapılabilecek diğer işlemler (kokteylleri göster vs)
  updateCocktailList();
}

// Backend’e malzeme listesini POST eden fonksiyon
async function saveIngredientsToBackend(ingredients) {
  try {
    const res = await fetch("https://senin-backend-url/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    });
    if (!res.ok) throw new Error("Backend güncelleme başarısız");
    console.log("Malzemeler backend'e kaydedildi:", ingredients);
  } catch (error) {
    console.error("Backend'e kaydetme hatası:", error);
  }
}

// Örnek: kokteylleri seçilen malzemelere göre filtreleyen fonksiyon
function updateCocktailList() {
  // Burada kokteyl listesini selectedIngredients'a göre güncelle
  // Örneğin, filtreleme ve gösterim kodun olabilir
  console.log("Güncel malzemelerle kokteyller güncellendi:", selectedIngredients);
}

// Checkboxlara event listener ekleyerek değişiklikleri takip et
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener("change", updateSelectedIngredients);
});

// Sayfa yüklendiğinde seçili malzemeleri backend’den çekip işlemek için (isteğe bağlı)
async function loadIngredientsFromBackend() {
  try {
    const res = await fetch("https://senin-backend-url/ingredients");
    const json = await res.json();
    selectedIngredients = json.ingredients || [];
    
    // Checkboxları seçili hale getir
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = selectedIngredients.includes(cb.value);
    });

    updateCocktailList();
  } catch (error) {
    console.error("Backend’den malzeme yükleme hatası:", error);
  }
}

// Sayfa açıldığında backend’den malzemeleri yükle
loadIngredientsFromBackend();
