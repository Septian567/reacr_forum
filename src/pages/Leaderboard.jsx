import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboardData } from "../features/leaderboard/leaderboardSlice";
import { fetchUserProfile } from "../features/user/userSlice";
import LoadingBar from "react-top-loading-bar";

const Leaderboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const { profile: currentUser, loading: isUserLoading } = useSelector(
    (state) => state.user
  );
  const { data: leaderboards, loading: isLeaderboardLoading } = useSelector(
    (state) => state.leaderboard
  );
  const isInitialLoad = isUserLoading || isLeaderboardLoading;

  useEffect(() => {
    setProgress(30);
    dispatch(fetchUserProfile()).then(() => setProgress(60));
    dispatch(fetchLeaderboardData()).then(() => setProgress(100));
  }, [dispatch]);

  const renderSkeletonRow = (_, index) => (
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
  );

  return (
    <div className="column center main-grid">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Header */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
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

      {/* Label Kolom */}
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

      {/* List */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {isInitialLoad
          ? [...Array(5)].map(renderSkeletonRow)
          : leaderboards.map((leaderboard, index) => (
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
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#333",
                  }}
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
