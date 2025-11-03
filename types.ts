export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bannerUrl?: string;
  bio?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export type View = 'home' | 'explore' | 'notifications' | 'profile' | 'network';