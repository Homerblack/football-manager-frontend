import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStandings } from "../services/matchService";

const PublicStandings = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const [standings, setStandings] = useState([]);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await getStandings(tournamentId);
      setStandings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getRankColor = (index) => {
    if (index === 0) return "#22c55e"; // 1st
    if (index === 1) return "#3b82f6"; // 2nd
    if (index === 2) return "#f59e0b"; // 3rd
    return "#64748b"; // others
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "18px",
        background:
          "linear-gradient(135deg, #f8fafc, #eef2f7)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          🏆 Standings
        </h1>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#111827",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Home
        </button>
      </div>

      {/* CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {standings.map((team, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* RANK */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: getRankColor(index),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              {index + 1}
            </div>

            {/* TEAM NAME */}
            <div
              style={{
                flex: 1,
                marginLeft: "10px",
                fontWeight: "bold",
                fontSize: "15px",
                color: "#0f172a",
              }}
            >
              {team.team}
            </div>

            {/* STATS */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "12px",
                color: "#475569",
              }}
            >
              <span>P:{team.played}</span>
              <span>W:{team.wins}</span>
              <span>L:{team.losses}</span>
              <span style={{ fontWeight: "bold", color: "#16a34a" }}>
                PTS:{team.points}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicStandings;