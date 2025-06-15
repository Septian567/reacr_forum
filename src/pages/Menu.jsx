import React from 'react';
import '../styles/left-column.css';
import NavSection from '../components/NavSection';
import UserProfile from '../components/UserProfile';

const Menu = () => {
  return (
    <div className="column left transparent-theme mobile-footer">
      <div className="forum-header">
        <h1 className="forum-title">Forum App</h1>
      </div>

      <nav className="forum-nav">
        <NavSection />
      </nav>

      <UserProfile />
    </div>
  );
};

export default Menu;
