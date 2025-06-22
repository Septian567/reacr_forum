import React from "react";
import { formatDate } from "../utils/dateFormatter";

const PostContent = ({ author, category, content, date }) => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span className="account-name">{author}</span>
    </div>
    <h4 className="post-category">#{category}</h4>
    <p className="post-content">{content}</p>
    <span className="post-date">{formatDate(date, "full")}</span>
  </>
);

export default PostContent;
