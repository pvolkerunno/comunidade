import React from 'react';
import type { User, View } from '../types';
import { HomeIcon, ExploreIcon, NotificationsIcon, ProfileIcon, NetworkIcon } from './Icons';
import { useAuth } from './AuthProvider';

interface SidebarProps {
  currentUser: User;
  activeView: View;
  onNavClick: (view: View) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center w-full text-left space-x-4 p-3 rounded-full transition-colors duration-200 ${active ? 'bg-accent/10 text-accent font-bold' : 'hover:bg-secondary'}`}>
    {icon}
    <span className="text-xl hidden lg:block">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeView, onNavClick }) => {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name || user?.email || currentUser.name;
  const displayUsername = user?.email ? user.email.split('@')[0] : currentUser.username;
  const avatarUrl = user?.user_metadata?.avatar_url || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(displayName || 'User')}`;
  return (
    <div className="h-full flex flex-col justify-between p-2">
      <div className="flex flex-col space-y-2">
        <div className="p-3">
          <div className="flex items-center justify-center lg:justify-start mb-2">
            <img 
              src="/logo.png" 
              alt="Logo da Comunidade" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-accent hidden lg:block text-center">
            Comunidade de Autoconhecimento Ativo
          </h1>
          <h1 className="text-lg font-bold text-accent block lg:hidden text-center">
            CAA
          </h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavItem icon={<HomeIcon className="w-7 h-7" />} label="Página Inicial" active={activeView === 'home'} onClick={() => onNavClick('home')} />
          <NavItem icon={<ExploreIcon className="w-7 h-7" />} label="Explorar" active={activeView === 'explore'} onClick={() => onNavClick('explore')} />
          <NavItem icon={<NetworkIcon className="w-7 h-7" />} label="Minha Rede" active={activeView === 'network'} onClick={() => onNavClick('network')} />
          <NavItem icon={<NotificationsIcon className="w-7 h-7" />} label="Notificações" active={activeView === 'notifications'} onClick={() => onNavClick('notifications')} />
          <NavItem icon={<ProfileIcon className="w-7 h-7" />} label="Perfil" active={activeView === 'profile'} onClick={() => onNavClick('profile')} />
        </nav>
        <button className="w-full mt-4 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-full text-lg transition-colors duration-200">
          <span className="hidden lg:block">Postar</span>
          <span className="block lg:hidden">+</span>
        </button>
      </div>

      <div className="p-3 hover:bg-secondary rounded-full cursor-pointer transition-colors duration-200" onClick={() => onNavClick('profile')}>
        <div className="flex items-center space-x-3">
          <img src={avatarUrl} alt={displayName} className="w-10 h-10 rounded-full" />
          <div className="hidden lg:block">
            <p className="font-bold text-sm">{displayName}</p>
            <p className="text-gray-light text-sm">@{displayUsername}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;