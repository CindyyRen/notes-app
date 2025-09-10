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
    data: { question, answer, difficulty, category },
  });
  res.status(201).json(card);
});
app.patch('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer, difficulty, category } = req.body;

  try {
    const updated = await prisma.flashcard.update({
      where: { id: parseInt(id) },
      data: {
        question,
        answer,
        difficulty,
        category,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: 'Flashcard not found' });
  }
});

app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.flashcard.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: 'Flashcard not found' });
  }
});
app.get('/flashcards/search', async (req, res) => {
  const { q } = req.query;
  const cards = await prisma.flashcard.findMany({
    where: {
      question: { contains: q, mode: 'insensitive' },
    },
  });
  res.json(cards);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
