import { useState } from 'react';

export interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-green-500 text-white px-2 py-0 rounded-lg cursor-pointer"
            onClick={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag} ×
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          className="flex-1 border border-gray-300 rounded p-2  focus:outline-none"
        />
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded focus:outline-none"
          onClick={addTag}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};
