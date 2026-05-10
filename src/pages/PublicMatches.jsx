import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMatchesByTournament,
} from "../services/matchService";

const PublicMatches = () => {

  const navigate = useNavigate();
  const { tournamentId } = useParams();

  const [matches, setMatches] = useState([]);
  const [teamFilter, setTeamFilter] = useState(""); // ✅ NEW

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await getMatchesByTournament(tournamentId);

      const playedMatches = data
        .filter(
          (match) =>
            match.homeScore !== null &&
            match.awayScore !== null
        )
        .sort((a, b) =>
          b.matchDate.localeCompare(a.matchDate)
        );

      setMatches(playedMatches);
    } catch (error) {
      console.error(error);
    }
  };

  const getWinner = (match) => {
    if (match.homeScore > match.awayScore) return "HOME";
    if (match.awayScore > match.homeScore) return "AWAY";
    return "DRAW";
  };

  // ✅ NEW FILTER LOGIC
  const filteredMatches = teamFilter
    ? matches.filter(
        (m) =>
          m.homeTeam === teamFilter ||
          m.awayTeam === teamFilter
      )
    : matches;

  // unique team list
  const teams = [
    ...new Set(
      matches.flatMap((m) => [m.homeTeam, m.awayTeam])
    ),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 50%, #dcfce7 100%)",
        padding: "40px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "52px",
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            ⚽ Match Results
          </h1>

          <p style={{ color: "#475569", fontSize: "18px" }}>
            Official completed fixtures
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px 28px",
            border: "none",
            borderRadius: "14px",
            background:
              "linear-gradient(to right, #6366f1, #8b5cf6)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow:
              "0 8px 20px rgba(99,102,241,0.3)",
          }}
        >
          ← Back Home
        </button>
      </div>

      {/* ✅ FILTER UI (ADDED) */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)",
            minWidth: "220px",
          }}
        >
          <option value="">All Teams</option>

          {teams.map((team, i) => (
            <option key={i} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* MATCHES */}
      <div
        style={{
          display: "grid",
          gap: "25px",
        }}
      >
        {filteredMatches.map((match) => {
          const winner = getWinner(match);

          return (
            <div
              key={match.id}
              style={{
                background:
                  "rgba(255,255,255,0.6)",
                backdropFilter: "blur(18px)",
                border:
                  "1px solid rgba(255,255,255,0.4)",
                borderRadius: "28px",
                padding: "30px",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {/* HOME */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h2
                    style={{
                      fontSize: "30px",
                      color:
                        winner === "HOME"
                          ? "#16a34a"
                          : winner === "DRAW"
                          ? "#ca8a04"
                          : "#dc2626",
                      marginBottom: "10px",
                    }}
                  >
                    {match.homeTeam}
                  </h2>

                  <p style={{ color: "#64748b" }}>
                    {winner === "HOME"
                      ? "Winner"
                      : winner === "DRAW"
                      ? "Draw"
                      : "Lost"}
                  </p>
                </div>

                {/* SCORE */}
                <div style={{ minWidth: "220px", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "58px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    {match.homeScore}
                    <span style={{ margin: "0 18px", color: "#94a3b8" }}>
                      -
                    </span>
                    {match.awayScore}
                  </div>

                  <div
                    style={{
                      marginTop: "12px",
                      display: "inline-block",
                      padding: "8px 18px",
                      borderRadius: "999px",
                      background: "#eef2ff",
                      color: "#4338ca",
                      fontWeight: "600",
                    }}
                  >
                    {new Date(match.matchDate + "T00:00:00").toLocaleDateString()}
                  </div>
                </div>

                {/* AWAY */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h2
                    style={{
                      fontSize: "30px",
                      color:
                        winner === "AWAY"
                          ? "#16a34a"
                          : winner === "DRAW"
                          ? "#ca8a04"
                          : "#dc2626",
                      marginBottom: "10px",
                    }}
                  >
                    {match.awayTeam}
                  </h2>

                  <p style={{ color: "#64748b" }}>
                    {winner === "AWAY"
                      ? "Winner"
                      : winner === "DRAW"
                      ? "Draw"
                      : "Lost"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicMatches;