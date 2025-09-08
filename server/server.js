// server.js
const express = require('express');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.use(express.json());

// CRUD 示例
app.get('/flashcards', async (req, res) => {
  const cards = await prisma.flashcard.findMany();
  res.json(cards);
});

app.post('/flashcards', async (req, res) => {
  const { question, answer, difficulty, category } = req.body;
  const card = await prisma.flashcard.create({
    data: { question, answer, difficulty, category }
  });
  res.status(201).json(card);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
