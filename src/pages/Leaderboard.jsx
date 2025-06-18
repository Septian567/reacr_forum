import React from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const { posts } = usePostContext();
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Budi",
      email: "budi@gmail.com",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Siti",
      email: "siti@example.com",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Andi",
      email: "andi@example.com",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
  ];

  const userScores = users.map((user) => {
    const totalVotes = posts
      .filter((p) => p.author === user.name)
      .reduce((sum, p) => sum + p.votes, 0);
    return { ...user, score: totalVotes };
  });

  const sortedUsers = userScores.sort((a, b) => b.score - a.score);

  return (
    <div className="column center main-grid">
      {/* Header kiri */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            marginRight: "10px",
          }}
          title="Kembali ke Threads"
        >
          ←
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Budi</span>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            budi@gmail.com
          </span>
        </div>
      </div>

      <h2 style={{ marginBottom: "20px" }}>Klasemen Pengguna Aktif</h2>

      {/* Label kolom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 5px 8px 5px",
          fontWeight: "bold",
          color: "#555",
          borderBottom: "2px solid #ccc",
        }}
      >
        <span>Pengguna</span>
        <span>Skor</span>
      </div>

      {/* Daftar pengguna */}
      <ul
        className="leaderboard-list"
        style={{ listStyle: "none", padding: 0, marginTop: "10px" }}
      >
        {sortedUsers.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 5px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{user.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {user.email}
                </div>
              </div>
            </div>
            <div
              style={{ fontWeight: "bold", fontSize: "1rem", color: "#333" }}
            >
              {user.score} poin
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
