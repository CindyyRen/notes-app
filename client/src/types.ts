export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'; // 对应你的 Difficulty enum

export interface Flashcard {
  id: number;
  category?: string;
  question: string;
  answer: string;
  difficulty?: Difficulty; // 可选，默认 EASY
}

