// src/components/NavLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BarChart } from 'react-feather';

const NavLinks = () => (
  <>
    <Link to="/" className="nav-item">
      <MessageSquare size={20} className="nav-icon" />
      <span className="nav-text">Threads</span>
    </Link>

    <Link to="/leaderboard" className="nav-item">
      <BarChart size={20} className="nav-icon" />
      <span className="nav-text">Leaderboard</span>
    </Link>
  </>
);

export default NavLinks;
