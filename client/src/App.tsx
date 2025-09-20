import FlashcardContainer from './components/FlashcardContainer';
import './index.css'; // Tailwind CSS
import { useFlashcards } from '../hooks/useFlashcards';

function App() {
  const { data: cards, isLoading, error } = useFlashcards();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl mx-auto p-0">
          {!cards || cards.length === 0 ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <FlashcardContainer flashcards={cards} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
