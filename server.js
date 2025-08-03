const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Başlangıçta elimizdeki malzemeler (default)
let ingredients = ["rum", "lime", "mint", "sugar"];

app.get("/ingredients", (req, res) => {
  res.json({ ingredients });
});

app.post("/ingredients", (req, res) => {
  const newIngredients = req.body.ingredients;
  if (!Array.isArray(newIngredients)) {
    return res.status(400).json({ error: "ingredients must be an array" });
  }
  ingredients = newIngredients;
  res.json({ message: "Ingredients updated", ingredients });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
