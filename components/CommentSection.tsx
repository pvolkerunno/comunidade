
import React, { useState } from 'react';
import type { Comment } from '../types';
import { useAuth } from './AuthProvider';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name || user?.email || 'Usuário';
  const avatarUrl = user?.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(displayName)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-dark">
      {comments.map(comment => (
        <div key={comment.id} className="flex space-x-3 mb-3">
          <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-8 h-8 rounded-full" />
          <div>
            <div className="bg-secondary rounded-xl p-2">
              <span className="font-bold text-sm">{comment.user.name}</span>
              <p className="text-sm">{comment.text}</p>
            </div>
            <span className="text-xs text-gray-light px-2">{comment.timestamp}</span>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex space-x-3 mt-4">
        <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
          className="w-full bg-secondary rounded-full px-4 py-2 text-sm placeholder-gray-light outline-none focus:ring-2 focus:ring-accent"
        />
      </form>
    </div>
  );
};

export default CommentSection;