import React from 'react';

const LeaderboardRow = ({ leaderboard, index, isCurrentUser }) => (
  <li
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 5px',
      borderBottom: '1px solid #ddd',
      backgroundColor: isCurrentUser ? '#f5f5f5' : 'transparent',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`https://i.pravatar.cc/40?img=${index + 1}`}
        alt={leaderboard.user.name}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px',
        }}
      />
      <div>
        <div style={{ fontWeight: 'bold' }}>
          {leaderboard.user.name}
          {isCurrentUser && (
            <span
              style={{ marginLeft: '5px', color: '#4CAF50', fontSize: '0.8em' }}
            >
              (Anda)
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          {leaderboard.user.email}
        </div>
      </div>
    </div>
    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>
      {leaderboard.score} poin
    </div>
  </li>
);

export default LeaderboardRow;
