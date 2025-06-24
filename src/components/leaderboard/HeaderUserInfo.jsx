import React from 'react';

const HeaderUserInfo = ({
  isUserLoading,
  displayName,
  displayEmail,
  onBack,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <button
      onClick={onBack}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        marginRight: '10px',
      }}
      title="Kembali ke Threads"
    >
      ←
    </button>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isUserLoading ? (
        <>
          <div
            style={{
              width: '120px',
              height: '16px',
              backgroundColor: '#eee',
              marginBottom: '4px',
            }}
          />
          <div
            style={{ width: '180px', height: '12px', backgroundColor: '#eee' }}
          />
        </>
      ) : (
        <>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {displayName}
          </span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>
            {displayEmail}
          </span>
        </>
      )}
    </div>
  </div>
);

export default HeaderUserInfo;
