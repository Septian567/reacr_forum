import React from 'react';
import { X, User } from 'react-feather';
import {
  ModalNoBackdrop,
  ModalInner,
  ModalHeader,
  CloseButton,
  ModalBody,
  ProfilePreview,
  ProfileImage,
  ProfileIconCircle,
  Username,
  ModalInput,
  ModalTextarea,
  ModalPostButton,
} from '../../styles/postModal.styles';

const PostModal = ({
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  category,
  setCategory,
  onClose,
  onPost,
  user,
}) => (
  <ModalNoBackdrop onClick={onClose}>
    <ModalInner onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <h3>Buat Postingan</h3>
        <CloseButton onClick={onClose}>
          <X size={18} />
        </CloseButton>
      </ModalHeader>

      <ModalBody>
        <ProfilePreview>
          {user?.avatar ? (
            <ProfileImage src={user.avatar} alt="profile" />
          ) : (
            <ProfileIconCircle>
              <User size={20} color="#fff" />
            </ProfileIconCircle>
          )}
          <Username>{user?.name || 'Anonim'}</Username>
        </ProfilePreview>

        <ModalInput
          type="text"
          placeholder="Judul"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <ModalInput
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <ModalTextarea
          placeholder="Apa yang ingin kamu bagikan?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        <ModalPostButton onClick={onPost}>Post</ModalPostButton>
      </ModalBody>
    </ModalInner>
  </ModalNoBackdrop>
);

export default PostModal;
