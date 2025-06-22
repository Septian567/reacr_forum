// src/components/UserProfile.jsx
import React from "react";
import { User as UserIcon } from "react-feather";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="user-section">
        <div
          className="user-profile"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="user-avatar default-avatar">
            <UserIcon size={20} />
          </div>
          <div className="user-info">
            <div className="user-name" style={{ fontWeight: "bold" }}>
              Anonim
            </div>
            <div
              className="user-email"
              style={{ fontSize: "0.85rem", color: "#666" }}
            >
              belum login
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-section">
      <div
        className="user-profile"
        style={{ display: "flex", alignItems: "center" }}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="user-avatar"
            style={{
              borderRadius: "50%",
              marginRight: "10px",
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="user-avatar default-avatar">
            <UserIcon size={20} />
          </div>
        )}
        <div className="user-info">
          <div className="user-name" style={{ fontWeight: "bold" }}>
            {user.name || "Anonim"}
          </div>
          <div
            className="user-email"
            style={{ fontSize: "0.85rem", color: "#666" }}
          >
            {user.email || "belum login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
