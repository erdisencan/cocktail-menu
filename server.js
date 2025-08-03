const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let currentIngredients = [];

app.get('/ingredients', (req, res) => {
  res.json({ ingredients: currentIngredients });
});

app.post('/ingredients', (req, res) => {
  const { ingredients } = req.body;
  if (Array.isArray(ingredients)) {
    currentIngredients = ingredients;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
});

module.exports = app;
