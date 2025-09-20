// api/flashcards.ts
import type { Flashcard, FlashcardInput } from '../src/types';

export async function fetchCards(): Promise<Flashcard[]> {
  const res = await fetch('http://localhost:5000/flashcards');
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export async function createFlashcard(
  card: FlashcardInput
): Promise<Flashcard> {
  const res = await fetch('http://localhost:5000/flashcards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error('Failed to create flashcard');
  return res.json();
}

// 编辑卡片
export async function editFlashcard(
  id: number,
  card: FlashcardInput
): Promise<Flashcard> {
  const res = await fetch(`http://localhost:5000/flashcards/${id}`, {
    method: 'PATCH', // 或 PATCH 根据你的后端
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error('Failed to update flashcard');
  return res.json();
}

// 删除卡片
export async function deleteFlashcard(id: number): Promise<void> {
  const res = await fetch(`http://localhost:5000/flashcards/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete flashcard');
}
