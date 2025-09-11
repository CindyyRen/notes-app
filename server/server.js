const express = require('express');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// GET - 获取所有卡片
app.get('/flashcards', async (req, res) => {
  try {
    const cards = await prisma.flashcard.findMany();
    res.json(cards);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// POST - 创建新卡片
app.post('/flashcards', async (req, res) => {
  try {
    // 修复1: 正确解构 tags 字段
    const { question, answer, difficulty, category, tags } = req.body;
    
    console.log('Creating flashcard with data:', { question, answer, difficulty, category, tags });
    
    const card = await prisma.flashcard.create({
      data: { 
        question, 
        answer, 
        difficulty, 
        category,
        tags: tags || [] // 修复2: 提供默认值
      },
    });
    
    console.log('Created flashcard:', card);
    res.status(201).json(card);
  } catch (err) {
    console.error('Error creating flashcard:', err);
    res.status(500).json({ error: 'Failed to create flashcard', details: err.message });
  }
});

// PATCH - 更新卡片
app.patch('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // 修复3: 正确解构所有字段包括 tags
    const { question, answer, difficulty, category, tags } = req.body;
    
    console.log(`Updating flashcard ${id} with data:`, { question, answer, difficulty, category, tags });
    
    // 修复4: 只更新提供的字段
    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    
    const updated = await prisma.flashcard.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    
    console.log('Updated flashcard:', updated);
    res.json(updated);
  } catch (err) {
    console.error('Error updating flashcard:', err);
    
    // 修复5: 更详细的错误处理
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Flashcard not found' });
    } else {
      res.status(500).json({ error: 'Failed to update flashcard', details: err.message });
    }
  }
});

// DELETE - 删除卡片
app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    console.log(`Deleting flashcard ${id}`);
    
    await prisma.flashcard.delete({ 
      where: { id: parseInt(id) } 
    });
    
    console.log(`Deleted flashcard ${id}`);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Flashcard not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete flashcard', details: err.message });
    }
  }
});

// GET - 搜索卡片
app.get('/flashcards/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const cards = await prisma.flashcard.findMany({
      where: {
        question: { contains: q, mode: 'insensitive' },
      },
    });
    
    res.json(cards);
  } catch (err) {
    console.error('Error searching flashcards:', err);
    res.status(500).json({ error: 'Failed to search flashcards' });
  }
});

// 修复6: 添加错误处理中间件
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);