const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });


// POST endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log("📩 Message received from frontend:", message);

  try {
    const result = await model.generateContent([message]);
    const reply = result.response.text();
    console.log("✅ Gemini reply:", reply);
    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini Error:", err.message || err);
    res.status(500).send("Gemini is having trouble responding.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Sahai (Gemini) backend running at http://localhost:${PORT}`);
});
async function listModels() {
  const models = await genAI.listModels();
  console.log(models);
}
listModels();
