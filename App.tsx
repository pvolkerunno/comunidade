import React, { useState, useCallback } from 'react';
import type { Post, Comment, View, User } from './types';
import { POSTS, USERS, CURRENT_USER_ID } from './constants';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightSidebar from './components/RightSidebar';
import BottomNav from './components/BottomNav';
import ExplorePage from './components/ExplorePage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import MyNetworkPage from './components/MyNetworkPage';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [users, setUsers] = useState<User[]>(USERS);
  const [activeView, setActiveView] = useState<View>('home');
  const currentUser = users.find(u => u.id === CURRENT_USER_ID)!;

  const handleNavClick = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
    // Also update user info in existing posts and comments to reflect changes immediately
    setPosts(prevPosts => 
      prevPosts.map(post => {
        const newPost = {...post};
        if (newPost.user.id === updatedUser.id) {
          newPost.user = updatedUser;
        }
        newPost.comments = newPost.comments.map(comment => {
          if (comment.user.id === updatedUser.id) {
            return { ...comment, user: updatedUser };
          }
          return comment;
        });
        return newPost;
      })
    );
  }, []);

  const handleAddPost = useCallback((content: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      user: currentUser,
      content,
      timestamp: 'agora',
      likes: 0,
      shares: 0,
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleAddComment = useCallback((postId: string, text: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      text,
      timestamp: 'agora',
    };
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  }, [currentUser]);

  const handleLike = useCallback((postId: string) => {
    // This is a simplified toggle. A real app would track who liked.
    setPosts(prevPosts =>
        prevPosts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
    );
  }, []);

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return <Feed posts={posts} onAddPost={handleAddPost} onAddComment={handleAddComment} onLike={handleLike} />;
      case 'explore':
        return <ExplorePage />;
      case 'network':
        return <MyNetworkPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage user={currentUser} onUpdateUser={handleUpdateUser} />;
      default:
        return <Feed posts={posts} onAddPost={handleAddPost} onAddComment={handleAddComment} onLike={handleLike} />;
    }
  }

  return (
    <div className="bg-primary min-h-screen text-light font-sans">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-12 gap-x-4">
          <aside className="hidden md:block md:col-span-2 lg:col-span-3 sticky top-0 h-screen">
            <Sidebar currentUser={currentUser} activeView={activeView} onNavClick={handleNavClick} />
          </aside>

          <main className="col-span-1 md:col-span-8 lg:col-span-6 min-h-screen border-x border-gray-dark pb-16 md:pb-0">
            {renderMainContent()}
          </main>
          
          <aside className="hidden lg:block lg:col-span-3 sticky top-0 h-screen">
            <RightSidebar />
          </aside>
        </div>
      </div>
      <BottomNav activeView={activeView} onNavClick={handleNavClick} />
    </div>
  );
};

export default App;