import React from 'react';

const NotificationsPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 bg-primary/80 backdrop-blur-md z-10 px-4 py-3 border-b border-gray-dark">
        <h1 className="text-xl font-bold">Notificações</h1>
      </div>
      <div className="p-4">
        <p className="text-gray-light text-center mt-8">Você não tem novas notificações no momento.</p>
      </div>
    </div>
  );
};

export default NotificationsPage;
