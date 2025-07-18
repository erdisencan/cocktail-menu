const kokteyller = [
  { ad: "Margarita", malzemeler: ["tekila", "lime", "triple-sec"] },
  { ad: "Mojito", malzemeler: ["rom", "lime", "nane", "şeker", "soda"] },
  { ad: "Whiskey Sour", malzemeler: ["viski", "lemon", "şeker"] },
  { ad: "Cosmopolitan", malzemeler: ["vodka", "lime", "triple-sec", "vişne"] }
];

const secimler = document.querySelectorAll('input[type="checkbox"]');
const sonucAlani = document.getElementById("sonuclar");

secimler.forEach(input => {
  input.addEventListener("change", kokteylListele);
});

function kokteylListele() {
  const seciliMalzemeler = [...secimler]
    .filter(input => input.checked)
    .map(input => input.id);

  if (seciliMalzemeler.length === 0) {
    sonucAlani.textContent = "Henüz seçim yapılmadı.";
    return;
  }

  const uygunlar = kokteyller
    .map(k => {
      const eksik = k.malzemeler.filter(m => !seciliMalzemeler.includes(m));
      return { ad: k.ad, eksikSayisi: eksik.length, eksik };
    })
    .filter(k => k.eksikSayisi <= 2)
    .sort((a, b) => a.eksikSayisi - b.eksikSayisi);

  if (uygunlar.length === 0) {
    sonucAlani.textContent = "Uygun kokteyl bulunamadı.";
  } else {
    sonucAlani.innerHTML = uygunlar
      .map(k => `<div><strong>${k.ad}</strong> ${k.eksikSayisi > 0 ? `(Eksik: ${k.eksik.join(", ")})` : ""}</div>`)
      .join("");
  }
}

document.getElementById("temaBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
