import React, { useEffect, useState } from "react";
import { User as UserIcon } from "react-feather";
import api from "../utils/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const profile = await api.getOwnProfile();
      setUser(profile);
    } catch (error) {
      setUser(null); // Reset jika gagal
      console.error("Gagal mengambil data user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    // Tambahkan listener untuk logout
    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener("userLoggedOut", handleLogoutEvent);

    return () => {
      window.removeEventListener("userLoggedOut", handleLogoutEvent);
    };
  }, []);

  if (loading) {
    return <div className="user-section">Loading...</div>;
  }

  return (
    <div className="user-section">
      <div
        className="user-profile"
        style={{ display: "flex", alignItems: "center" }}
      >
        {user?.avatar ? (
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
            {user?.name || "Anonim"}
          </div>
          <div
            className="user-email"
            style={{ fontSize: "0.85rem", color: "#666" }}
          >
            {user?.email || "belum login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
