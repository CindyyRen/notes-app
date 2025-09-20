// Modal.tsx
import React, { useState } from 'react';
import { TagInput } from './TagInput';
// import type { Difficulty } from '../types';
import type { Difficulty, FlashcardInput } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FlashcardInput) => void;
  isPending: boolean; // ✅ 单独的 prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [category, setCategory] = React.useState('REACT');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');

  const [tags, setTags] = React.useState<string[]>([]);
  // const [tagInput, setTagInput] = React.useState('');

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">New Flashcard</h2>

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none"
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2 h-40  focus:outline-none" // 高度增加
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2"
        >
          <option value="REACT">React</option>
          <option value="JS">JavaScript</option>
          <option value="CS">Computer Science</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        <TagInput tags={tags} setTags={setTags} />

        <div className="flex justify-end space-x-2 mt-2">
          <button
            className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isPending} // ✅ 使用单独的 prop
            onClick={() => {
              onSubmit({ question, answer, category, difficulty, tags });
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
