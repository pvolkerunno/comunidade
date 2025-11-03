import React, { useState } from 'react';
import type { User } from '../types';
import EditProfileModal from './EditProfileModal';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <div className="sticky top-0 bg-primary/80 backdrop-blur-md z-10 px-4 py-3 border-b border-gray-dark">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-light">0 Posts</p>
      </div>
      <div>
        <div className="h-48 bg-gray-dark bg-cover bg-center" style={{ backgroundImage: `url(${user.bannerUrl || `https://picsum.photos/seed/${user.id}/1000/400`})`}}>
          {/* Banner image */}
        </div>
        <div className="p-4 -mt-20">
          <div className="flex justify-between items-end">
              <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary bg-primary object-cover" />
              <button onClick={() => setIsModalOpen(true)} className="border border-gray-light font-bold px-4 py-2 rounded-full text-sm hover:bg-secondary">
                  Editar Perfil
              </button>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-light">@{user.username}</p>
          </div>
          <div className="mt-4 text-sm">
              <p>{user.bio || 'Adicione uma bio para se apresentar.'}</p>
          </div>
           <div className="mt-4 border-t border-gray-dark">
                <h3 className="text-lg font-bold text-center py-4">Posts em breve...</h3>
           </div>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal 
          user={user} 
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedData) => {
            onUpdateUser(updatedData);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;