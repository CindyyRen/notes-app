const { PrismaClient, Difficulty } = require('@prisma/client'); // 注意这里引入 Difficulty 枚举
const fs = require('fs');

const prisma = new PrismaClient();

// 数字映射到 Difficulty 枚举（使用 Prisma 的枚举类型）
const difficultyMap = {
  1: Difficulty.EASY,
  2: Difficulty.MEDIUM,
  3: Difficulty.HARD,
};

async function main() {
  const rawData = fs.readFileSync('./seed/flashcards.json', 'utf8');
  const data = JSON.parse(rawData).flashcards;

  const formattedData = data.map((card) => ({
    category: card.category || null,
    question: card.question,
    answer: card.answer,
    difficulty: difficultyMap[card.difficulty] || Difficulty.EASY,
  }));

  // 批量插入
  const batchSize = 500;
  for (let i = 0; i < formattedData.length; i += batchSize) {
    const batch = formattedData.slice(i, i + batchSize);
    await prisma.flashcard.createMany({ data: batch });
    console.log(`Inserted ${i + batch.length}/${formattedData.length}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
