import React, { useEffect, useState } from "react";
import api from "../utils/api"; // pastikan path ke api.js sesuai

const UserProfile = () => {
  const [user, setUser] = useState(null); // untuk menyimpan data user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await api.getOwnProfile();
        setUser(profile);
      } catch (error) {
        console.error("Gagal mengambil data user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="user-section">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="user-section">Tidak dapat memuat data pengguna.</div>
    );
  }

  return (
    <div className="user-section">
      <div
        className="user-profile"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={user.avatar || "https://via.placeholder.com/40"}
          alt={user.name}
          className="user-avatar"
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <div className="user-info">
          <div className="user-name" style={{ fontWeight: "bold" }}>
            {user.name}
          </div>
          <div
            className="user-email"
            style={{ fontSize: "0.85rem", color: "#666" }}
          >
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
