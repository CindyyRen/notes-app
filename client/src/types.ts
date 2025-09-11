
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: Difficulty; // 确保这里用的是 Difficulty 类型
  tags?: string[]; // 注意可选字段
}
