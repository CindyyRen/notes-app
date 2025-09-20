export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category?: string | null; // ✅ 可选字段（Prisma 是 String?）
  difficulty: Difficulty;
  tags: string[]; // ✅ 永远是数组（至少是 []）
  createdAt: string; // ✅ DateTime 在前端通常用 string 表示
  updatedAt: string;
}

export interface FlashcardInput {
  question: string;
  answer: string;
  category: string;
  difficulty: Difficulty;
  tags?: string[];
}