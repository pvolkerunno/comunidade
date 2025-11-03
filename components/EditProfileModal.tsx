import React, { useState, useRef } from 'react';
import type { User } from '../types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || '');
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      fileToBase64(file).then(setAvatarPreview);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerFile(file);
      fileToBase64(file).then(setBannerPreview);
    }
  };

  const handleSave = async () => {
    let newAvatarUrl = user.avatarUrl;
    let newBannerUrl = user.bannerUrl;

    if (avatarFile) {
        newAvatarUrl = await fileToBase64(avatarFile);
    }
    if (bannerFile) {
        newBannerUrl = await fileToBase64(bannerFile);
    }
    
    onSave({
      ...user,
      name,
      username,
      bio,
      avatarUrl: newAvatarUrl,
      bannerUrl: newBannerUrl,
    });
  };

  return (
    <div className="fixed inset-0 bg-light/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-primary rounded-2xl w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-primary/80 backdrop-blur-md flex items-center justify-between p-4 border-b border-gray-dark z-10">
          <div className="flex items-center space-x-4">
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
            <h2 className="text-xl font-bold">Editar Perfil</h2>
          </div>
          <button onClick={handleSave} className="bg-light text-primary px-4 py-1.5 rounded-full font-bold text-sm">
            Salvar
          </button>
        </div>
        
        <div className="h-[200px] bg-gray-dark relative flex items-center justify-center">
            <img src={bannerPreview || user.bannerUrl || `https://picsum.photos/seed/${user.id}/1000/400`} alt="Banner" className="w-full h-full object-cover" />
            <button onClick={() => bannerInputRef.current?.click()} className="absolute bg-light/50 p-2 rounded-full text-primary hover:bg-light/70 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </button>
            <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden"/>
        </div>

        <div className="p-4 -mt-16">
          <div className="relative w-32 h-32">
            <img src={avatarPreview || user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-primary bg-primary object-cover" />
             <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-2 right-2 bg-light/50 p-2 rounded-full text-primary hover:bg-light/70 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </button>
            <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden"/>
          </div>

          <div className="mt-6 space-y-6 pb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-light">Nome</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-secondary border border-gray-dark rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent"/>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-light">Nome de usuário</label>
              <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full bg-secondary border border-gray-dark rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent"/>
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-light">Bio</label>
              <textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} className="mt-1 block w-full bg-secondary border border-gray-dark rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
