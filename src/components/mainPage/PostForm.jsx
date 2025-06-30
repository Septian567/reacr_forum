// postForm.jsx

import React from "react";
import { User as UserIcon } from "react-feather";
import usePostForm from "../../hooks/usePostForm";
import {
  PostFormWrapper,
  ProfileWrapper,
  ProfilePhoto,
  CircleIcon,
  FormFields,
  Input,
  TextArea,
  SubmitAction,
  SubmitButton,
  BtnText,
  BtnIcon,
} from "./PostForm.styles";

const PostForm = ({ onPost }) => {
  const {
    title,
    category,
    content,
    loading,
    user,
    setTitle,
    setCategory,
    setContent,
    handleSubmit,
  } = usePostForm(onPost);

  return (
    <PostFormWrapper>
      <ProfileWrapper>
        {user?.avatar ? (
          <ProfilePhoto src={user.avatar} alt={user.name || "User"} />
        ) : (
          <CircleIcon>
            <UserIcon size={20} />
          </CircleIcon>
        )}
      </ProfileWrapper>

      <FormFields>
        <Input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextArea
          placeholder="Isi konten..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitAction>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            <BtnText>{loading ? "Mengirim..." : "Kirim"}</BtnText>
            <BtnIcon>+</BtnIcon>
          </SubmitButton>
        </SubmitAction>
      </FormFields>
    </PostFormWrapper>
  );
};

export default PostForm;
