import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import api from "../utils/api";
import PostHeader from "../components/PostHeader";
import { formatDate } from "../utils/dateFormatter";
import { MessageCircle, ThumbsUp, ThumbsDown } from "react-feather";
import DOMPurify from "dompurify";
import LoadingBar from "react-top-loading-bar";
import "../styles/detailPage.css";
import "../styles/postList.css";
import "../styles/CommentForm.css";
import "../styles/CommentList.css";

const ProfilePhoto = ({ username, getPhoto }) => (
  <div className="profile-wrapper">
    <img
      src={getPhoto(username)}
      alt={`Foto profil ${username}`}
      className="profile-photo"
    />
  </div>
);

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

const CommentForm = ({ author, comment, setComment, onSubmit, getPhoto }) => (
  <div className="comment-form">
    <ProfilePhoto username={author} getPhoto={getPhoto} />
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

const CommentList = ({ comments, onVote, getPhoto }) => (
  <div className="comment-list">
    <h4>{comments.length} Komentar:</h4>
    {comments.length === 0 ? (
      <p>Belum ada komentar.</p>
    ) : (
      comments.map((c) => (
        <div key={c.id} className="comment-list-item">
          <ProfilePhoto username={c.owner.name} getPhoto={getPhoto} />
          <div style={{ flex: 1 }}>
            <div className="comment-header">
              <span className="comment-author">{c.owner.name}</span>
              <span className="comment-meta">{formatDate(c.createdAt)}</span>
            </div>
            <div
              className="comment-content"
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
            <PostActions
              upvotes={c.upVotesBy?.length || 0}
              downvotes={c.downVotesBy?.length || 0}
              onVote={(type) => onVote(c.id, type)}
              showComments={false}
            />
          </div>
        </div>
      ))
    )}
  </div>
);

const PostItem = ({ post, onVote, getPhoto }) => (
  <div className="post-item">
    <ProfilePhoto username={post.owner.name} getPhoto={getPhoto} />
    <div className="post-content-wrapper">
      <span className="account-name">{post.owner.name}</span>
      <h4 className="post-category">#{post.category}</h4>
      <h3 className="post-title">{post.title}</h3>
      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
      />
      <span className="post-date spaced-date">
        {formatDate(post.createdAt, "full")}
      </span>
      <PostActions
        comments={post.comments?.length}
        upvotes={post.upVotesBy?.length}
        downvotes={post.downVotesBy?.length}
        onVote={onVote}
      />
    </div>
  </div>
);

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePostData } = usePostContext();

  const [progress, setProgress] = useState(0);
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setProgress(30);

    const fetchData = async () => {
      try {
        const [threadData, usersData] = await Promise.all([
          api.getThreadDetail(id),
          api.getAllUsers(),
        ]);

        setThread(threadData);
        setUsers(usersData);
        setProgress(70);

        try {
          const profile = await api.getOwnProfile();
          setUser(profile);
        } catch (profileError) {
          setUser(null);
        }

        setProgress(100);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setProgress(100);
      }
    };

    fetchData();

    // Tambahkan event listener untuk logout
    const handleLogoutEvent = () => {
      setUser(null); // Ini akan menyembunyikan form komentar
    };

    window.addEventListener("userLoggedOut", handleLogoutEvent);

    return () => {
      window.removeEventListener("userLoggedOut", handleLogoutEvent);
    };
  }, [id]);

  const getUserProfilePhoto = (username) => {
    const user = users.find((u) => u.name === username);
    return user?.avatar || "https://via.placeholder.com/40";
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setProgress(30);
      api
        .createComment({ threadId: id, content: comment })
        .then(() => {
          setProgress(70);
          return api.getThreadDetail(id);
        })
        .then((updatedThread) => {
          setThread(updatedThread);
          updatePostData({
            id,
            comments: updatedThread.comments,
            totalComments: updatedThread.comments.length,
          });
          setProgress(100);
        })
        .catch((error) => {
          console.error(error);
          setProgress(100);
        });
      setComment("");
    }
  };

  const handleVotePost = (type) => {
    setProgress(30);
    const voteFn = {
      up: api.upVoteThread,
      down: api.downVoteThread,
    }[type];

    if (voteFn) {
      voteFn(id)
        .then(() => {
          setProgress(70);
          return api.getThreadDetail(id);
        })
        .then((updatedThread) => {
          setThread(updatedThread);
          updatePostData({
            id,
            upVotesBy: updatedThread.upVotesBy,
            downVotesBy: updatedThread.downVotesBy,
          });
          setProgress(100);
        })
        .catch((error) => {
          console.error(error);
          setProgress(100);
        });
    }
  };

  const handleVoteComment = (commentId, type) => {
    setProgress(30);
    const voteFn = {
      up: api.upVoteComment,
      down: api.downVoteComment,
    }[type];

    if (voteFn) {
      voteFn({ threadId: id, commentId })
        .then(() => {
          setProgress(70);
          return api.getThreadDetail(id);
        })
        .then((updatedThread) => {
          setThread(updatedThread);
          updatePostData({
            id,
            comments: updatedThread.comments,
          });
          setProgress(100);
        })
        .catch((error) => {
          console.error(error);
          setProgress(100);
        });
    }
  };

  if (!thread) {
    return (
      <div className="column center main-grid detail-page-container">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <PostHeader onBack={() => navigate(-1)} author="" />
        <p>Memuat detail postingan...</p>
      </div>
    );
  }

  return (
    <div className="column center main-grid detail-page-container">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <PostHeader onBack={() => navigate(-1)} author={thread?.owner?.name} />
      {thread && (
        <>
          <PostItem
            post={thread}
            onVote={handleVotePost}
            getPhoto={getUserProfilePhoto}
          />
          {user && (
            <CommentForm
              author={thread.owner.name}
              comment={comment}
              setComment={setComment}
              onSubmit={handleAddComment}
              getPhoto={getUserProfilePhoto}
            />
          )}
          <CommentList
            comments={thread.comments}
            onVote={handleVoteComment}
            getPhoto={getUserProfilePhoto}
          />
        </>
      )}
    </div>
  );
};

export default DetailPage;
