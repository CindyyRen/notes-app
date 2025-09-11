import { useEffect, useState } from 'react';
import type { Difficulty, Flashcard } from '../types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import { TagInput } from './TagInput';

interface FlashcardContainerProps {
  flashcards: Flashcard[];
  setCards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

const FlashcardContainer: React.FC<FlashcardContainerProps> = ({
  flashcards,
  setCards,
}) => {
  const [selected, setSelected] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState('');

  const [editingData, setEditingData] = useState<{
    question: string;
    difficulty: Difficulty;
    category: string;
    tags: string[];
  }>({
    question: selected?.question || '',
    difficulty: 'EASY' as Difficulty,
    category: 'REACT',
    tags: [],
  });
  useEffect(() => {
    if (selected) {
      console.log('Selected flashcard:', selected); // 调试日志
      console.log(
        'Selected difficulty:',
        selected.difficulty,
        typeof selected.difficulty
      );

      setEditingData({
        question: selected.question || '', // ✅ 这里加上
        // 修复：确保 difficulty 是有效的 Difficulty 类型
        difficulty: (['EASY', 'MEDIUM', 'HARD'].includes(selected.difficulty)
          ? selected.difficulty
          : 'EASY') as Difficulty,
        category: selected.category || 'REACT',
        tags: Array.isArray(selected.tags) ? selected.tags : [],
      });
    }
  }, [selected]);
  const handleSelect = (fc: Flashcard) => {
    console.log('Selecting flashcard:', fc); // 调试日志
    setSelected(fc);
    setShowAnswer(false); // 每次选题重置为隐藏答案
    setIsEditing(false); // 重置编辑状态
  };

  const handleEdit = () => {
    if (selected) {
      setEditValue(selected.answer);
      setIsEditing(true);
    }
  };
  const handleCreate = async (data: {
    question: string;
    answer: string;
    category: string;
    difficulty: string;
    tags: string[];
  }) => {
    try {
      console.log('Creating flashcard with data:', data);

      const res = await fetch('http://localhost:5000/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const newCard = await res.json();
      console.log('Created flashcard:', newCard);
      setCards((prev) => [...prev, newCard]);
    } catch (err) {
      console.error('Error creating flashcard:', err);
      alert('Failed to create flashcard. Check console for details.');
    }
  };

  const handleSave = async () => {
    if (!selected) return;

    try {
      const updateData = {
        ...selected,
        answer: editValue,
        difficulty: editingData.difficulty,
        category: editingData.category,
        tags: editingData.tags,
      };

      console.log('Updating flashcard with data:', updateData);

      const res = await fetch(
        `http://localhost:5000/flashcards/${selected.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const updated = await res.json();
      console.log('Updated flashcard:', updated);

      setSelected(updated);
      setIsEditing(false);

      setCards((prev) =>
        prev.map((card) => (card.id === updated.id ? updated : card))
      );
    } catch (err) {
      console.error('Error updating flashcard:', err);
      alert('Failed to update flashcard. Check console for details.');
    }
  };

  const handleTitleSave = async (id: number) => {
    if (!selected) return;

    try {
      const updateData = {
        ...selected,
        question: tempValue, // ⚡ 注意：用 tempValue 而不是 editingData.question
      };

      const res = await fetch(`http://localhost:5000/flashcards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const updated = await res.json();

      setSelected(updated);
      setCards((prev) =>
        prev.map((card) => (card.id === updated.id ? updated : card))
      );
      setEditingId(null); // 保存完退出编辑模式
    } catch (err) {
      console.error('Error updating flashcard:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/flashcards/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setCards((prev) => prev.filter((fc) => fc.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      console.error('Error deleting flashcard:', err);
      alert('Failed to delete flashcard.');
    }
  };

  // 根据 search 过滤问题列表
  const filteredFlashcards = flashcards.filter((fc) =>
    fc.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
      {/* 左侧问题列表 */}
      <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col max-h-screen">
        {/* 搜索框 - 固定在顶部 */}
        <div className="flex-shrink-0 p-4 bg-white border-b border-gray-100">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:bg-blue-50 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* 新建按钮 */}
        <button
          onClick={() => setShowForm(true)}
          className="ml-4 px-3 py-2 bg-green-500 text-white rounded focus:outline-none"
        >
          + New
        </button>
        {/* 问题列表 - 可滚动区域 */}
        {/* <div className="flex-1 overflow-y-auto p-4">
          <ul className="divide-y divide-gray-200">
            {filteredFlashcards.map((fc) => (
              <li
                key={fc.id}
                className={`py-2 px-2 cursor-pointer hover:bg-blue-50 transition rounded ${
                  selected?.id === fc.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelect(fc)}
              >
                {fc.question}
              </li>
            ))}
            {filteredFlashcards.length === 0 && (
              <li className="py-2 px-2 text-gray-400 text-sm">No results</li>
            )}
          </ul>
        </div> */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="divide-y divide-gray-200">
            {filteredFlashcards.map((fc) => (
              <li
                key={fc.id}
                className={`py-2 px-2 cursor-pointer hover:bg-blue-50 transition rounded ${
                  selected?.id === fc.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelect(fc)}
              >
                {editingId === fc.id ? (
                  <input
                    autoFocus
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={() => handleTitleSave(fc.id)} // 失焦保存
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleTitleSave(fc.id); // 回车保存
                      if (e.key === 'Escape') setEditingId(null); // ESC 取消
                    }}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <span
                    onDoubleClick={() => {
                      setEditingId(fc.id);
                      setTempValue(fc.question);
                    }}
                  >
                    {fc.question}
                  </span>
                )}
              </li>
            ))}
            {filteredFlashcards.length === 0 && (
              <li className="py-2 px-2 text-gray-400 text-sm">No results</li>
            )}
          </ul>
        </div>
      </div>

      {/* 右侧答案显示 */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-start items-start">
        {selected ? (
          <>
            <h2 className="text-xl font-bold mb-2">{selected.category}</h2>

            {isEditing ? (
              // 编辑模式
              <div className="flex flex-col w-full h-full">
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition hover:outline-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition hover:outline-none"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex gap-4 mt-2  items-end min-h-18  mb-3">
                  {/* Difficulty */}
                  <div className="flex flex-col flex-1">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                      value={editingData.difficulty}
                      onChange={(e) =>
                        setEditingData((prev) => ({
                          ...prev,
                          difficulty: e.target.value as Difficulty,
                        }))
                      }
                      className="mt-1 w-full border border-gray-300 rounded p-2"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col flex-1">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={editingData.category}
                      onChange={(e) =>
                        setEditingData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="mt-1 w-full border border-gray-300 rounded p-2"
                    >
                      <option value="REACT">React</option>
                      <option value="AWS">AWS</option>
                      <option value="NODEJS">NodeJS</option>
                      <option value="NEXTJS">NextJS</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <TagInput
                    tags={editingData.tags}
                    setTags={(tags) =>
                      setEditingData((prev) => ({ ...prev, tags }))
                    }
                  />
                </div>

                <textarea
                  className="w-full flex-grow border border-gray-300 rounded p-3 mb-3 resize-none"
                  style={{ minHeight: '70vh' }}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            ) : (
              // 非编辑模式
              <div
                className="flex-1 w-full cursor-pointer"
                onClick={() => {
                  setShowAnswer((prev) => !prev);
                }}
              >
                {/* 按钮区 */}
                <div className="space-x-2 mb-4">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation(); // 防止冒泡
                      setShowAnswer(!showAnswer);
                    }}
                  >
                    {showAnswer ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(selected.id);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>

                {/* 答案显示 */}
                {showAnswer && (
                  <>
                    <p className="mb-4 text-gray-700 whitespace-pre-wrap">
                      {selected.answer.replace(/\*\*/g, '')}
                    </p>
                    <small className="block text-gray-500">
                      Difficulty: {selected.difficulty}
                    </small>
                    <small className="block text-gray-500">
                      Category: {selected.category}
                    </small>
                    <small className="block text-gray-500">
                      Tags: {selected.tags?.[0] ?? 'No tags'}
                    </small>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center w-full">
            Select a question from the left
          </p>
        )}
      </div>
      {/* Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default FlashcardContainer;
