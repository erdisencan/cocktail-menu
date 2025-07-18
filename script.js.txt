const kokteyller = [
  {
    ad: "Mojito",
    malzemeler: ["rom", "lime", "nane", "şeker", "soda"]
  },
  {
    ad: "Margarita",
    malzemeler: ["tekila", "lime", "triple sec"]
  },
  {
    ad: "Sade Rom",
    malzemeler: ["rom"]
  }
];

function kokteylleriGoster() {
  const secilenMalzemeler = Array.from(document.querySelectorAll('#malzemeler input:checked')).map(el => el.value);
  const sonucDiv = document.getElementById("sonuclar");
  sonucDiv.innerHTML = "";

  kokteyller.forEach(k => {
    const eksik = k.malzemeler.filter(m => !secilenMalzemeler.includes(m));
    const div = document.createElement("div");
    div.className = "kokteyl";

    if (eksik.length === 0) {
      div.textContent = `✅ ${k.ad} yapılabilir!`;
    } else {
      div.textContent = `❌ ${k.ad} için eksik: ${eksik.join(", ")}`;
    }

    sonucDiv.appendChild(div);
  });
}