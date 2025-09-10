import { useEffect, useState } from 'react';
import type { Flashcard } from './types';
import FlashcardContainer from './components/FlashcardContainer';
import './index.css'; // Tailwind CSS

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl mx-auto p-0">
          {cards.length === 0 ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <FlashcardContainer flashcards={cards} setCards={setCards}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
