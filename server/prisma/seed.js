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



const { PrismaClient, Difficulty } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const flashcards = [
  {
    "question": "Core Concepts - Redux",
    "answer": "Predictable state container for JavaScript apps, implementing unidirectional data flow with actions, reducers, and store",
    "category": "React",
    "tags": ["Redux", "Redux"],
    "difficulty": "EASY"
  },
  {
    "question": "Core Concepts - Store",
    "answer": "Single source of truth that holds the complete state tree of the application",
    "category": "React",
    "tags": ["Redux", "Store"],
    "difficulty": "EASY"
  },
  {
    "question": "Core Concepts - Action",
    "answer": "Plain JavaScript object that describes what happened, must have a type property",
    "category": "React",
    "tags": ["Redux", "Action"],
    "difficulty": "EASY"
  },
  {
    "question": "Core Concepts - Action Creator",
    "answer": "Function that returns an action object",
    "category": "React",
    "tags": ["Redux", "Action Creator"],
    "difficulty": "EASY"
  },
  {
    "question": "Core Concepts - Reducer",
    "answer": "Pure function that takes current state and action, returns new state",
    "category": "React",
    "tags": ["Redux", "Reducer"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Core Concepts - Dispatch",
    "answer": "Method to send actions to the store to trigger state changes",
    "category": "React",
    "tags": ["Redux", "Dispatch"],
    "difficulty": "EASY"
  },
  {
    "question": "Core Concepts - Selector",
    "answer": "Function that selects/extracts data from the store state",
    "category": "React",
    "tags": ["Redux", "Selector"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Core Concepts - Middleware",
    "answer": "Functions that intercept actions before they reach reducers",
    "category": "React",
    "tags": ["Redux", "Middleware"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Principles - Single Source of Truth",
    "answer": "Application state is stored in a single store",
    "category": "React",
    "tags": ["Redux", "Single Source of Truth"],
    "difficulty": "EASY"
  },
  {
    "question": "Redux Principles - State is Read-Only",
    "answer": "State can only be changed by dispatching actions",
    "category": "React",
    "tags": ["Redux", "State is Read-Only"],
    "difficulty": "EASY"
  },
  {
    "question": "Redux Principles - Changes Made with Pure Functions",
    "answer": "Reducers must be pure functions without side effects",
    "category": "React",
    "tags": ["Redux", "Changes Made with Pure Functions"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Principles - Immutable Updates",
    "answer": "State updates must return new objects, never mutate existing state",
    "category": "React",
    "tags": ["Redux", "Immutable Updates"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Toolkit (RTK) - Redux Toolkit",
    "answer": "Official recommended toolset for efficient Redux development",
    "category": "React",
    "tags": ["Redux", "Redux Toolkit"],
    "difficulty": "EASY"
  },
  {
    "question": "Redux Toolkit (RTK) - configureStore",
    "answer": "RTK function that sets up store with good defaults and middleware",
    "category": "React",
    "tags": ["Redux", "configureStore"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Toolkit (RTK) - createSlice",
    "answer": "Function that generates action creators and reducers in one place",
    "category": "React",
    "tags": ["Redux", "createSlice"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Toolkit (RTK) - createAsyncThunk",
    "answer": "Utility for handling asynchronous logic with pending/fulfilled/rejected states",
    "category": "React",
    "tags": ["Redux", "createAsyncThunk"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Redux Toolkit (RTK) - createEntityAdapter",
    "answer": "Utilities for managing normalized state collections",
    "category": "React",
    "tags": ["Redux", "createEntityAdapter"],
    "difficulty": "HARD"
  },
  {
    "question": "Redux Toolkit (RTK) - RTK Query",
    "answer": "Data fetching and caching solution built on Redux Toolkit",
    "category": "React",
    "tags": ["Redux", "RTK Query"],
    "difficulty": "HARD"
  },
  {
    "question": "Async Handling - Redux Thunk",
    "answer": "Middleware that allows action creators to return functions instead of objects",
    "category": "React",
    "tags": ["Redux", "Redux Thunk"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Async Handling - Redux Saga",
    "answer": "Middleware using generator functions for complex async flow control",
    "category": "React",
    "tags": ["Redux", "Redux Saga"],
    "difficulty": "HARD"
  },
  {
    "question": "Async Handling - Redux Observable",
    "answer": "RxJS-based middleware for handling complex async operations",
    "category": "React",
    "tags": ["Redux", "Redux Observable"],
    "difficulty": "HARD"
  },
  {
    "question": "Async Handling - Side Effects",
    "answer": "Asynchronous operations like API calls, handled outside reducers",
    "category": "React",
    "tags": ["Redux", "Side Effects"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "React Integration - React-Redux",
    "answer": "Official React bindings for Redux",
    "category": "React",
    "tags": ["Redux", "React-Redux"],
    "difficulty": "EASY"
  },
  {
    "question": "React Integration - useSelector",
    "answer": "React hook to extract data from Redux store state",
    "category": "React",
    "tags": ["Redux", "useSelector"],
    "difficulty": "EASY"
  },
  {
    "question": "React Integration - useDispatch",
    "answer": "React hook to get dispatch function for sending actions",
    "category": "React",
    "tags": ["Redux", "useDispatch"],
    "difficulty": "EASY"
  },
  {
    "question": "React Integration - connect",
    "answer": "Higher-order component that connects React components to Redux store",
    "category": "React",
    "tags": ["Redux", "connect"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "React Integration - Provider",
    "answer": "React component that makes Redux store available to nested components",
    "category": "React",
    "tags": ["Redux", "Provider"],
    "difficulty": "EASY"
  },
  {
    "question": "Advanced Patterns - Normalized State",
    "answer": "Storing relational data in flat structures with IDs and lookups",
    "category": "React",
    "tags": ["Redux", "Normalized State"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Advanced Patterns - Redux DevTools",
    "answer": "Browser extension for debugging Redux state changes",
    "category": "React",
    "tags": ["Redux", "Redux DevTools"],
    "difficulty": "EASY"
  },
  {
    "question": "Advanced Patterns - Time Travel Debugging",
    "answer": "Ability to replay actions and examine state at any point",
    "category": "React",
    "tags": ["Redux", "Time Travel Debugging"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Advanced Patterns - Hot Reloading",
    "answer": "Development feature to update reducers without losing state",
    "category": "React",
    "tags": ["Redux", "Hot Reloading"],
    "difficulty": "MEDIUM"
  },
  {
    "question": "Advanced Patterns - Store Enhancer",
    "answer": "Higher-order function that adds capabilities to store",
    "category": "React",
    "tags": ["Redux", "Store Enhancer"],
    "difficulty": "HARD"
  }
]

  for (const card of flashcards) {
    await prisma.flashcard.create({ data: card });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
