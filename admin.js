const allIngredients = ["rum", "vodka", "whiskey", "lime", "mint", "sugar", "tonic", "lemon", "cachaca"];

function renderCheckboxes() {
  const container = document.getElementById("ingredient-list");
  allIngredients.forEach(ing => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = ing;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + ing));
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

async function sendToBackend() {
  const selected = [...document.querySelectorAll("input[type='checkbox']:checked")].map(el => el.value);
  await fetch("/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: selected })
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckboxes();
  document.getElementById("save-button").addEventListener("click", sendToBackend);
});
