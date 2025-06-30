import React from "react";
import {
  Wrapper,
  BackButton,
  UserInfoWrapper,
  NameSkeleton,
  EmailSkeleton,
  UserName,
  UserEmail,
} from "./HeaderUserInfo.styles";

const HeaderUserInfo = ({
  isUserLoading,
  displayName,
  displayEmail,
  onBack,
}) => (
  <Wrapper>
    <BackButton onClick={onBack} title="Kembali ke Threads">
      ←
    </BackButton>
    <UserInfoWrapper>
      {isUserLoading ? (
        <>
          <NameSkeleton />
          <EmailSkeleton />
        </>
      ) : (
        <>
          <UserName>{displayName}</UserName>
          <UserEmail>{displayEmail}</UserEmail>
        </>
      )}
    </UserInfoWrapper>
  </Wrapper>
);

export default HeaderUserInfo;
