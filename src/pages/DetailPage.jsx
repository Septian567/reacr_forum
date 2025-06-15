import React from "react";
import PostHeader from "../components/PostHeader";
import useDetailPage from "../hooks/useDetailPage";
import { formatDate } from "../utils/dateFormatter";
import { MessageCircle, ThumbsUp, ThumbsDown } from "react-feather";
import "../styles/detailPage.css";
import "../styles/postList.css";
import "../styles/CommentForm.css";
import "../styles/CommentList.css";

// Komponen ProfilePhoto
const ProfilePhoto = () => (
  <div className="profile-wrapper">
    <img
      src="https://via.placeholder.com/40"
      alt="Profile"
      className="profile-photo"
    />
  </div>
);

// Komponen PostActions
const PostActions = ({
  comments,
  upvotes,
  downvotes,
  onVote,
  showComments = true,
}) => (
  <div className="post-actions">
    {showComments && comments !== undefined && (
      <div className="action-item">
        <MessageCircle size={16} />
        <span>{comments}</span>
      </div>
    )}
    <div
      className="action-item"
      onClick={() => onVote("up")}
      style={{ cursor: "pointer" }}
    >
      <ThumbsUp size={16} />
      <span>{upvotes}</span>
    </div>
    <div
      className="action-item"
      onClick={() => onVote("down")}
      style={{ cursor: "pointer" }}
    >
      <ThumbsDown size={16} />
      <span>{downvotes}</span>
    </div>
  </div>
);


// Komponen CommentForm
const CommentForm = ({ author, comment, setComment, onSubmit }) => (
  <div className="comment-form">
    <ProfilePhoto />
    <div className="form-wrapper">
      <div className="reply-label">Replying to @{author}</div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar Anda..."
      />
      <button onClick={onSubmit}>Kirim Komentar</button>
    </div>
  </div>
);

// Komponen CommentList
const CommentList = ({ comments, onVote }) => (
  <div className="comment-list">
    <h4>{comments.length} Komentar:</h4>
    {comments.length === 0 ? (
      <p>Belum ada komentar.</p>
    ) : (
      comments.map((c) => (
        <div key={c.id} className="comment-list-item">
          <ProfilePhoto />
          <div style={{ flex: 1 }}>
            <div className="comment-header">
              <span className="comment-author">{c.author}</span>
              <span className="comment-meta">{formatDate(c.date)}</span>
            </div>
            <p className="comment-content">{c.content}</p>

            {/* Gunakan PostActions sebagai comment vote */}
            <PostActions
              upvotes={c.upvotes || 0}
              downvotes={c.downvotes || 0}
              onVote={(type) => onVote(c.id, type)}
              showComments={false}
            />
          </div>
        </div>
      ))
    )}
  </div>
);


// Komponen PostItem
const PostItem = ({ post, onVote }) => (
  <div className="post-item">
    <ProfilePhoto />
    <div className="post-content-wrapper">
      <span className="account-name">{post.author}</span>
      <h4 className="post-category">#{post.category}</h4>
      <p className="post-detail-content">{post.content}</p>
      <span className="post-date spaced-date">
        {formatDate(post.date, "full")}
      </span>
      <PostActions
        comments={post.comments}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        onVote={onVote}
      />
    </div>
  </div>
);

// Komponen utama DetailPage
const DetailPage = () => {
  const {
    post,
    comment,
    setComment,
    comments,
    handleAddComment,
    handleVoteComment,
    handlePostVote,
    navigate,
  } = useDetailPage();

  if (!post) {
    return (
      <div className="column center main-grid detail-page-container">
        <PostHeader onBack={() => navigate(-1)} author="" />
        <p>Postingan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="column center main-grid detail-page-container">
      <PostHeader onBack={() => navigate(-1)} author={post.author} />
      <PostItem post={post} onVote={handlePostVote} />
      <CommentForm
        author={post.author}
        comment={comment}
        setComment={setComment}
        onSubmit={handleAddComment}
      />
      <CommentList comments={comments} onVote={handleVoteComment} />
    </div>
  );
};

export default DetailPage;
