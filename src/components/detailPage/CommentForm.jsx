import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import {
  CommentFormWrapper,
  FormInnerWrapper,
  ReplyLabel,
  CommentTextarea,
  SubmitButton,
} from '../../styles/CommentForm.styles';

const CommentForm = ({ author, comment, setComment, onSubmit, getPhoto }) => (
  <CommentFormWrapper onSubmit={(e) => e.preventDefault()}>
    <ProfilePhoto username={author} getPhoto={getPhoto} />
    <FormInnerWrapper>
      <ReplyLabel>Replying to @{author}</ReplyLabel>
      <CommentTextarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar Anda..."
      />
      <SubmitButton onClick={onSubmit}>Kirim Komentar</SubmitButton>
    </FormInnerWrapper>
  </CommentFormWrapper>
);

export default CommentForm;
