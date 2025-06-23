import React from 'react';

const ProfilePhoto = ({ username, getPhoto }) => (
  <div className="profile-wrapper">
    <img
      src={getPhoto(username)}
      alt={`Foto profil ${username}`}
      className="profile-photo"
    />
  </div>
);

export default ProfilePhoto;
