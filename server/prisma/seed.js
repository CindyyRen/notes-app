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
//==============统一修改category==========================
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function updateCategory() {
//   const cards = await prisma.flashcard.findMany();

//   for (let card of cards) {
//     await prisma.flashcard.update({
//       where: { id: card.id },
//       data: {
//         category: 'React', // 统一改成 React
//       },
//     });
//   }

//   console.log(`Updated category to React for ${cards.length} flashcards`);
// }

// updateCategory()
//   .catch((e) => console.error(e))
//   .finally(() => prisma.$disconnect());
//==============统一修改添加tag==========================
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// function extractPrimaryTag(question) {
//   const q = (question || "").toLowerCase();

//   if (/\bredux\b/.test(q)) return "redux";
//   if (/\bhook(s)?\b/.test(q) || /use(state|effect|context|reducer|callback|memo|ref)\b/.test(q)) return "hooks";
//   if (/\bjsx\b/.test(q) || /\bbabel\b/.test(q) || /\btranspil/i.test(q)) return "jsx";
//   if (/\brout(e|ing|er)\b/.test(q) || /<routes?>/.test(q)) return "routing";
//   if (/\blifecycle\b/.test(q) || /componentdid|componentwill|constructor|render\(|mount\b|unmount\b/.test(q)) return "lifecycle";
//   if (/\bdom\b|\bvirtual dom\b/.test(q)) return "dom";
//   if (/\bspa\b|\bsingle page\b/.test(q)) return "spa";
//   if (/\bperformance\b|\bcode split|lazy\b|\bsuspense\b|\bchunk(s)?\b|\boptimi(z|s)e\b/.test(q)) return "performance";
//   if (/\bauthentica|jwt\b|\blogin\b|\btoken\b/.test(q)) return "auth";
//   if (/\bcomponent(s)?\b/.test(q) && !/\bredux|hook|jsx|lifecycle|routing/.test(q)) return "components";

//   return "react";
// }

// async function main() {
//   const flashcards = await prisma.flashcard.findMany({
//     select: { id: true, question: true },
//   });

//   console.log(`共读到 ${flashcards.length} 条卡片`);

//   for (const card of flashcards) {
//     const tag = extractPrimaryTag(card.question || "");
//     await prisma.flashcard.update({
//       where: { id: card.id },
//       data: { tags: [tag] },
//     });
//     console.log(`updated id=${card.id} -> [${tag}]`);
//   }

//   console.log("全部完成。");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 先查询所有 flashcards
  const flashcards = await prisma.flashcard.findMany();

  for (const card of flashcards) {
    if (card.question.includes("+")) {
      const newQuestion = card.question.replace(/\s*\+\s*/, " - ");
      await prisma.flashcard.update({
        where: { id: card.id },
        data: { question: newQuestion }
      });
      console.log(`Updated card id ${card.id}: ${card.question} -> ${newQuestion}`);
    }
  }

  console.log("All + signs replaced with -.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
