// const { PrismaClient, Difficulty } = require('@prisma/client'); // 注意这里引入 Difficulty 枚举
// const fs = require('fs');

// const prisma = new PrismaClient();

// // 数字映射到 Difficulty 枚举（使用 Prisma 的枚举类型）
// const difficultyMap = {
//   1: Difficulty.EASY,
//   2: Difficulty.MEDIUM,
//   3: Difficulty.HARD,
// };

// async function main() {
//   const rawData = fs.readFileSync('./seed/flashcards.json', 'utf8');
//   const data = JSON.parse(rawData).flashcards;

//   const formattedData = data.map((card) => ({
//     category: card.category || null,
//     question: card.question,
//     answer: card.answer,
//     difficulty: difficultyMap[card.difficulty] || Difficulty.EASY,
//   }));

//   // 先清空表
//   await prisma.flashcard.deleteMany({});
//   console.log('Existing flashcards deleted!');

//   // 批量插入
//   const batchSize = 500;
//   for (let i = 0; i < formattedData.length; i += batchSize) {
//     const batch = formattedData.slice(i, i + batchSize);
//     await prisma.flashcard.createMany({ data: batch });
//     console.log(`Inserted ${i + batch.length}/${formattedData.length}`);
//   }

//   console.log('Seed completed!');
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect());
//下面是删除所有**和项目符号-的代码
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function cleanFlashcards() {
//   const cards = await prisma.flashcard.findMany();

//   for (let card of cards) {
//     let question = card.question || '';
//     let answer = card.answer || '';

//     // 删除所有 ** 和开头的 - 项目符号
//     question = question.replace(/\*\*/g, '').replace(/^\s*-\s*/gm, '');
//     answer = answer.replace(/\*\*/g, '').replace(/^\s*-\s*/gm, '');

//     await prisma.flashcard.update({
//       where: { id: card.id },
//       data: { question, answer },
//     });
//   }

//   console.log(`Cleaned ${cards.length} flashcards!`);
//   await prisma.$disconnect();
// }

// cleanFlashcards().catch(console.error);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCategory() {
  const cards = await prisma.flashcard.findMany();

  for (let card of cards) {
    await prisma.flashcard.update({
      where: { id: card.id },
      data: {
        category: 'React', // 统一改成 React
      },
    });
  }

  console.log(`Updated category to React for ${cards.length} flashcards`);
}

updateCategory()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
