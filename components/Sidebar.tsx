import React from 'react';
import type { User, View } from '../types';
import { HomeIcon, ExploreIcon, NotificationsIcon, ProfileIcon, NetworkIcon } from './Icons';

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
  return (
    <div className="h-full flex flex-col justify-between p-2">
      <div className="flex flex-col space-y-2">
        <div className="p-3">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 text-accent fill-current">
            <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
          </svg>
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
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
          <div className="hidden lg:block">
            <p className="font-bold text-sm">{currentUser.name}</p>
            <p className="text-gray-light text-sm">@{currentUser.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;