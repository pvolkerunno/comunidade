import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, NetworkIcon } from './Icons';
import type { View } from '../types';

interface BottomNavProps {
  activeView: View;
  onNavClick: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavClick }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-gray-dark p-2 flex justify-around items-center z-20">
      <button onClick={() => onNavClick('home')} className={`p-2 rounded-full hover:bg-secondary ${activeView === 'home' ? 'text-accent' : ''}`}>
        <HomeIcon className="w-7 h-7" />
      </button>
      <button onClick={() => onNavClick('explore')} className={`p-2 rounded-full hover:bg-secondary ${activeView === 'explore' ? 'text-accent' : ''}`}>
        <ExploreIcon className="w-7 h-7" />
      </button>
      <button onClick={() => onNavClick('network')} className={`p-2 rounded-full hover:bg-secondary ${activeView === 'network' ? 'text-accent' : ''}`}>
        <NetworkIcon className="w-7 h-7" />
      </button>
      <button onClick={() => onNavClick('notifications')} className={`p-2 rounded-full hover:bg-secondary ${activeView === 'notifications' ? 'text-accent' : ''}`}>
        <NotificationsIcon className="w-7 h-7" />
      </button>
    </nav>
  );
};

export default BottomNav;