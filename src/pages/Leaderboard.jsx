import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

// Cache system dengan TTL 5 menit
const leaderboardCache = {
  data: null,
  lastFetch: 0,
  ttl: 5 * 60 * 1000,
  get: function () {
    const now = Date.now();
    return this.lastFetch + this.ttl > now ? this.data : null;
  },
  set: function (data) {
    this.data = data;
    this.lastFetch = Date.now();
  },
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const cachedUser = localStorage.getItem("cachedUser");
    return cachedUser ? JSON.parse(cachedUser) : { name: "", email: "" };
  });
  const [leaderboards, setLeaderboards] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Load cached data first
      const cachedLeaderboard = leaderboardCache.get();
      if (cachedLeaderboard) {
        setLeaderboards(cachedLeaderboard);
      }

      try {
        // Parallel fetching dengan prioritas
        const [userData, leaderboardData] = await Promise.all([
          // Jika user sudah ada di cache, skip API call
          currentUser.name ? Promise.resolve(null) : api.getOwnProfile(),
          cachedLeaderboard ? Promise.resolve(null) : api.getLeaderboards(),
        ]);

        // Update user data jika diperlukan
        if (userData) {
          setCurrentUser({ name: userData.name, email: userData.email });
          localStorage.setItem("cachedUser", JSON.stringify(userData));
        }

        // Update leaderboard jika diperlukan
        if (leaderboardData) {
          leaderboardCache.set(leaderboardData);
          setLeaderboards(leaderboardData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsInitialLoad(false);
        setIsUserLoading(false);
      }
    };

    fetchData();
  }, []);

  // Skeleton Loading untuk seluruh komponen
  if (isInitialLoad) {
    return (
      <div className="column center main-grid">
        {/* Header Skeleton */}
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
            <div
              style={{
                width: "120px",
                height: "16px",
                backgroundColor: "#eee",
                marginBottom: "4px",
              }}
            />
            <div
              style={{
                width: "180px",
                height: "12px",
                backgroundColor: "#eee",
              }}
            />
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

        {/* Daftar pengguna skeleton */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 5px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#eee",
                  marginRight: "10px",
                }}
              />
              <div>
                <div
                  style={{
                    width: "100px",
                    height: "16px",
                    backgroundColor: "#eee",
                    marginBottom: "4px",
                  }}
                />
                <div
                  style={{
                    width: "150px",
                    height: "12px",
                    backgroundColor: "#eee",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                width: "60px",
                height: "16px",
                backgroundColor: "#eee",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="column center main-grid">
      {/* Header */}
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
          {isUserLoading ? (
            <>
              <div
                style={{
                  width: "120px",
                  height: "16px",
                  backgroundColor: "#eee",
                  marginBottom: "4px",
                }}
              />
              <div
                style={{
                  width: "180px",
                  height: "12px",
                  backgroundColor: "#eee",
                }}
              />
            </>
          ) : (
            <>
              <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                {currentUser.name}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#666" }}>
                {currentUser.email}
              </span>
            </>
          )}
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
      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {leaderboards.map((leaderboard, index) => (
          <li
            key={leaderboard.user.id}
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
                src={`https://i.pravatar.cc/40?img=${index + 1}`}
                alt={leaderboard.user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {leaderboard.user.name}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {leaderboard.user.email}
                </div>
              </div>
            </div>
            <div
              style={{ fontWeight: "bold", fontSize: "1rem", color: "#333" }}
            >
              {leaderboard.score} poin
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
