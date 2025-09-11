// Modal.tsx
import React from 'react';
import { TagInput } from './TagInput';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    question: string;
    answer: string;
    category: string;
    difficulty: string;
    tags: string[];
  }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [category, setCategory] = React.useState('REACT');
  const [difficulty, setDifficulty] = React.useState('EASY');
  const [tags, setTags] = React.useState<string[]>([]);
  // const [tagInput, setTagInput] = React.useState('');

  if (!isOpen) return null;

  // const handleAddTag = () => {
  //   const newTag = tagInput.trim();
  //   if (newTag && !tags.includes(newTag)) {
  //     setTags([...tags, newTag]);
  //   }
  //   setTagInput('');
  // };

  // const handleRemoveTag = (tag: string) => {
  //   setTags(tags.filter((t) => t !== tag));
  // };

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
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        >
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        {/* Tags 输入 */}
        {/* <div className="mb-4">
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex flex-wrap gap-2 mb-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-500 text-white px-2 py-0 rounded-lg cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </span>
            ))}
          </div>
          <div className="flex gap-2 ">
            <input
              type="text"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none"
              onKeyDown={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
              }
            />
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>
        </div> */}
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
