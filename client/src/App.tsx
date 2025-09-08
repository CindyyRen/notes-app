import { useEffect, useState } from 'react';
import type { Flashcard } from './types'; // 注意加了 type 关键字

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/flashcards') // 你的 express 路由
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Flashcards</h1>
      {cards.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <strong>Q:</strong> {card.question} <br />
              <strong>A:</strong> {card.answer} <br />
              <em>Difficulty: {card.difficulty}</em>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
