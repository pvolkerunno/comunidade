
import React, { useState } from 'react';
import { USERS, CURRENT_USER_ID } from '../constants';

interface CreatePostProps {
  onAddPost: (content: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
  const [content, setContent] = useState('');
  const currentUser = USERS.find(u => u.id === CURRENT_USER_ID)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddPost(content);
      setContent('');
    }
  };

  return (
    <div className="p-4 border-b border-gray-dark">
      <div className="flex space-x-4">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que está acontecendo?"
            className="w-full bg-transparent text-xl placeholder-gray-light outline-none resize-none"
            rows={3}
          />
          <div className="flex justify-end items-center mt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-accent hover:bg-accent-hover disabled:bg-accent/50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
            >
              Postar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
