import React from "react";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfilePhoto = ({ username, getPhoto }) => (
  <ProfileWrapper>
    <ProfileImage src={getPhoto(username)} alt={`Foto profil ${username}`} />
  </ProfileWrapper>
);

export default ProfilePhoto;
