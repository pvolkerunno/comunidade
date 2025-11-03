
import React, { useState } from 'react';
import type { Post } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, MoreIcon } from './Icons';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, text: string) => void;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment, onLike }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const ActionButton: React.FC<{ icon: React.ReactNode; count: number; colorClass: string; hoverBgClass: string; onClick?: () => void }> = ({ icon, count, colorClass, hoverBgClass, onClick }) => (
    <button onClick={onClick} className={`flex items-center space-x-2 text-gray-light hover:${colorClass} transition-colors duration-200 group`}>
      <div className={`p-2 rounded-full group-hover:${hoverBgClass}`}>
        {icon}
      </div>
      <span>{count}</span>
    </button>
  );

  return (
    <article className="border-b border-gray-dark p-4 flex space-x-4 hover:bg-secondary transition-colors duration-200 cursor-pointer">
      <div className="flex-shrink-0">
        <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{post.user.name}</span>
            <span className="text-gray-light">@{post.user.username}</span>
            <span className="text-gray-light">·</span>
            <span className="text-gray-light">{post.timestamp}</span>
          </div>
          <button className="text-gray-light hover:text-accent p-2 rounded-full">
            <MoreIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="whitespace-pre-wrap my-2">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-3 rounded-2xl border border-gray-dark overflow-hidden">
            <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />
          </div>
        )}
        <div className="flex justify-around mt-4 text-gray-light">
          <ActionButton 
            icon={<CommentIcon className="w-5 h-5" />} 
            count={post.comments.length} 
            colorClass="text-blue-400"
            hoverBgClass="bg-blue-400/20"
            onClick={() => setCommentsVisible(!commentsVisible)}
          />
          <ActionButton 
            icon={<ShareIcon className="w-5 h-5" />} 
            count={post.shares} 
            colorClass="text-green-400"
            hoverBgClass="bg-green-400/20"
          />
          <ActionButton 
            icon={<HeartIcon className="w-5 h-5" />} 
            count={post.likes} 
            colorClass="text-pink-500"
            hoverBgClass="bg-pink-500/20"
            onClick={() => onLike(post.id)}
          />
        </div>
        {commentsVisible && <CommentSection comments={post.comments} postId={post.id} onAddComment={onAddComment} />}
      </div>
    </article>
  );
};

export default PostCard;