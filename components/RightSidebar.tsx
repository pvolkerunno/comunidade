
import React from 'react';
import { USERS } from '../constants';
import { MoreIcon, SearchIcon } from './Icons';

const RightSidebar: React.FC = () => {
  const suggestedUsers = USERS.slice(1, 4); // Exclude current user
  const trends = [
    { topic: '#AutoconhecimentoAtivo', posts: '12.3K publicações' },
    { topic: '#Mindfulness', posts: '8.9K publicações' },
    { topic: '#Journaling', posts: '5.4K publicações' },
    { topic: '#InteligênciaEmocional', posts: '9.8K publicações' },
  ];

  return (
    <div className="p-4 space-y-5">
      <div className="relative">
        <input 
          type="text"
          placeholder="Buscar"
          className="w-full bg-secondary rounded-full py-2 pl-10 pr-4 text-light placeholder-gray-light focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-gray-light"/>
        </div>
      </div>

      <div className="bg-secondary rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">O que está acontecendo</h2>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex justify-between items-center hover:bg-gray-dark p-2 rounded-lg cursor-pointer">
              <div>
                <p className="text-gray-light text-sm">Em alta</p>
                <p className="font-bold">{trend.topic}</p>
                <p className="text-gray-light text-sm">{trend.posts}</p>
              </div>
              <MoreIcon className="w-5 h-5 text-gray-light"/>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-secondary rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">Quem seguir</h2>
        <div className="space-y-4">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-gray-light text-sm">@{user.username}</p>
                </div>
              </div>
              <button className="bg-light text-primary hover:bg-light/80 font-bold px-4 py-1 rounded-full text-sm transition-colors duration-200">
                Seguir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;