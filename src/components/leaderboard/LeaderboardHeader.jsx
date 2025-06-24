import React from 'react';

const LeaderboardHeader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 5px 8px 5px',
      fontWeight: 'bold',
      color: '#555',
      borderBottom: '2px solid #ccc',
    }}
  >
    <span>Pengguna</span>
    <span>Skor</span>
  </div>
);

export default LeaderboardHeader;
