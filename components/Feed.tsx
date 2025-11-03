
import React from 'react';
import type { Post } from '../types';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

interface FeedProps {
  posts: Post[];
  onAddPost: (content: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onLike: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onAddPost, onAddComment, onLike }) => {
  return (
    <div>
      <div className="sticky top-0 bg-primary/80 backdrop-blur-md z-10 px-4 py-3 border-b border-gray-dark">
        <h1 className="text-xl font-bold">Página Inicial</h1>
      </div>
      <CreatePost onAddPost={onAddPost} />
      <div className="border-t border-gray-dark">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onAddComment={onAddComment} onLike={onLike} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
