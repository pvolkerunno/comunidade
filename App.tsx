import React, { useState, useCallback, useEffect } from 'react';
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
import { AuthProvider, useAuth } from './components/AuthProvider';
import AuthForm from './components/AuthForm';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthGate>
        <AppContent />
      </AuthGate>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [users, setUsers] = useState<User[]>(USERS);
  const [activeView, setActiveView] = useState<View>('home');
  const currentUser = users.find(u => u.id === CURRENT_USER_ID)!;
  const { user: authUser } = useAuth();

  const mapAuthUserToUI = (): User => {
    const name = (authUser?.user_metadata as any)?.name || authUser?.email || currentUser.name;
    const username = authUser?.email ? authUser.email.split('@')[0] : currentUser.username;
    const avatarUrl = (authUser?.user_metadata as any)?.avatar_url || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;
    return {
      id: authUser?.id || currentUser.id,
      name,
      username,
      avatarUrl,
      bio: currentUser.bio,
      bannerUrl: currentUser.bannerUrl,
    };
  };

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

  const handleAddPost = useCallback(async (content: string) => {
    const uiUser = mapAuthUserToUI();
    const newPost: Post = {
      id: `p${Date.now()}`,
      user: uiUser,
      content,
      timestamp: 'agora',
      likes: 0,
      shares: 0,
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    try {
      await supabase.from('posts').insert({
        content,
        user_id: authUser?.id,
        image_url: null,
      });
    } catch (e) {
      console.warn('Supabase: falha ao inserir post, mantendo local. Detalhes:', e);
    }
  }, [authUser]);

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

  // Autenticação é gerenciada pelo AuthProvider

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, content, created_at, user_id, image_url')
          .order('created_at', { ascending: false })
          .limit(50);
        if (error) throw error;
        const mapped: Post[] = (data || []).map((row: any) => ({
          id: row.id?.toString() ?? `p-${row.created_at}`,
          user: mapAuthUserToUI(),
          content: row.content,
          imageUrl: row.image_url ?? undefined,
          timestamp: new Date(row.created_at).toLocaleString(),
          likes: 0,
          comments: [],
          shares: 0,
        }));
        if (mapped.length) setPosts(mapped);
      } catch (e) {
        console.warn('Supabase: não foi possível carregar posts, usando mocks. Detalhes:', e);
      }
    };
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Painel de verificação removido; mantendo apenas lógica de posts

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
            {/* Painel de Supabase removido conforme solicitado */}
            {renderMainContent()}
          </main>
          
          <aside className="hidden lg:block lg:col-span-3 sticky top-0 h-screen">
            <RightSidebar />
          </aside>
        </div>
      </div>
      <BottomNav activeView={activeView} onNavClick={handleNavClick} />
      <LogoutButton />
    </div>
  );
};

export default App;

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary text-light">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }
  if (!session) {
    return <AuthForm />;
  }
  return <>{children}</>;
};

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <button
      onClick={signOut}
      title="Sair"
      className="fixed bottom-20 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow"
    >
      Sair
    </button>
  );
};