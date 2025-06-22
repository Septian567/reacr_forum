import React from 'react';
import { MessageSquare, BarChart, LogOut, Plus } from 'react-feather';

const NavSection = () => {
  return (
    <div className="nav-section">
      <div className="nav-item">
        <MessageSquare size={20} className="nav-icon" />
        <span className="nav-text">Threads</span>
      </div>
      <div className="nav-item">
        <BarChart size={20} className="nav-icon" />
        <span className="nav-text">Leaderboard</span>
      </div>
      <div className="nav-item">
        <LogOut size={20} className="nav-icon" />
        <span className="nav-text">Logout</span>
      </div>
      {/* Tombol Post dipindahkan ke sini untuk styling lebih mudah */}
      <div className="post-button-container">
        <button className="post-button mobile-post-button">
          <Plus size={20} />
          <span className="desktop-only-text">Post</span>
        </button>
      </div>
    </div>
  );
};

export default NavSection;
