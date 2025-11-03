import React from 'react';
import { USERS } from '../constants';
import type { User } from '../types';

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="border border-gray-dark rounded-lg p-4 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:border-accent">
    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
    <p className="font-bold">{user.name}</p>
    <p className="text-gray-light text-sm mb-4">@{user.username}</p>
    <button className="bg-light text-primary hover:bg-light/80 font-bold px-6 py-2 rounded-full text-sm w-full transition-colors duration-200">
      Seguir
    </button>
  </div>
);

const MyNetworkPage: React.FC = () => {
  // Exclude the current user (u1) from suggestions
  const suggestedUsers = USERS.filter(u => u.id !== 'u1');

  return (
    <div>
      <div className="sticky top-0 bg-primary/80 backdrop-blur-md z-10 px-4 py-3 border-b border-gray-dark">
        <h1 className="text-xl font-bold">Minha Rede</h1>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Sugestões para você</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {suggestedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNetworkPage;