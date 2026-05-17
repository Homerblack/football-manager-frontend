import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom"; // Added for routing after logout

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext"; // Pulling in auth context for logout

import {
  getMatches,
} from "../services/matchService";

import {
  quickUpdateScore,
} from "../services/matchApprovalService";

const MatchScoreEntry = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth(); // Destructuring your logout function

  const [matches, setMatches] = useState([]);
  const [scores, setScores] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await getMatches();
      
      const filtered = data
        .filter(
          (match) =>
            match.homeScore === null &&
            match.awayScore === null
        )
        .sort(
          (a, b) =>
            new Date(b.matchDate) - new Date(a.matchDate)
        );

      setMatches(filtered);
    } catch (error) {
      console.error(error);
      alert("Failed to load matches");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logoutUser(); // Clears user tokens/context state
      navigate("/login"); // Directs them securely back to your login glass screen
    }
  };

  const handleChange = (matchId, field, value) => {
    setScores((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (matchId) => {
    try {
      const score = scores[matchId];

      if (
        !score ||
        score.homeScore === "" ||
        score.awayScore === ""
      ) {
        alert("Enter both scores");
        return;
      }

      await quickUpdateScore(matchId, {
        homeScore: Number(score.homeScore),
        awayScore: Number(score.awayScore),
      });

      alert("Score updated successfully");

      setMatches((prev) =>
        prev.filter((m) => m.id !== matchId)
      );
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to update score"
      );
    }
  };

  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return matches.slice(start, start + ITEMS_PER_PAGE);
  }, [matches, currentPage]);

  const totalPages = Math.ceil(
    matches.length / ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <div style={dashboardWrapperStyle}>
        <div style={glowLeftStyle} />
        <div style={glowRightStyle} />

        <div style={contentContainerStyle}>
          
          {/* HEADER STATUS AREA WITH LOGOUT */}
          <div style={headerAreaStyle}>
            <div>
              <span style={badgeTopStyle}>🏆 LIVE TOURNAMENT MANAGEMENT</span>
              <h1 style={mainHeadingStyle}>Match Score Entry</h1>
              <p style={subheadingStyle}> Input real-time statistics and finalize team scores </p>
            </div>
            
            {/* UTILITY BADGES RIGHT SIDE */}
            <div style={headerActionsStyle}>
              <div style={countBadgeStyle}>
                <span style={{ fontWeight: "800" }}>{matches.length}</span> Pending
              </div>
            </div>
          </div>

          {/* MAIN MATCH CARDS RENDERING */}
          {paginatedMatches.length === 0 ? (
            <div style={emptyGlassCardStyle}>
              <div style={emptyIconStyle}>🎉</div>
              <h2 style={{ margin: "0 0 8px 0", color: "#0f172a", fontWeight: "800" }}>
                All Caught Up!
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
                There are no pending matches awaiting scores.
              </p>
            </div>
          ) : (
            paginatedMatches.map((match) => (
              <div key={match.id} style={matchGlassCardStyle}>
                
                <div style={cardHeaderStyle}>
                  <div style={tournamentTagStyle}>
                    <span style={{ marginRight: "6px" }}>⚽</span> {match.tournamentName}
                  </div>
                  <div style={dateTagStyle}>
                    {match.matchDate}
                  </div>
                </div>

                <div style={scorePanelGridStyle}>
                  
                  {/* HOME TEAM ROW */}
                  <div style={teamFlexRowStyle}>
                    <div style={teamAvatarStyle}>H</div>
                    <span style={teamNameStyle}>{match.homeTeam}</span>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={scores[match.id]?.homeScore || ""}
                      onChange={(e) =>
                        handleChange(match.id, "homeScore", e.target.value)
                      }
                      style={scoreInputStyle}
                    />
                  </div>

                  <div style={vsDividerStyle}>
                    <span style={vsTextStyle}>VS</span>
                  </div>

                  {/* AWAY TEAM ROW */}
                  <div style={teamFlexRowStyle}>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={scores[match.id]?.awayScore || ""}
                      onChange={(e) =>
                        handleChange(match.id, "awayScore", e.target.value)
                      }
                      style={scoreInputStyle}
                    />
                    <span style={{ ...teamNameStyle, textAlign: "right" }}>{match.awayTeam}</span>
                    <div style={{ ...teamAvatarStyle, backgroundColor: "#fdf2f8", color: "#db2777" }}>A</div>
                  </div>

                  {/* SUBMIT ACTION PANEL */}
                  <div style={actionBlockStyle}>
                    <button
                      onClick={() => handleSubmit(match.id)}
                      style={submitActionButtonStyle}
                    >
                      Publish Score
                    </button>
                  </div>

                </div>

              </div>
            ))
          )}

          {/* PAGINATION NAVIGATION BAR */}
          {totalPages > 1 && (
            <div style={paginationWrapperStyle}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={paginationButtonStyle(currentPage === 1)}
              >
                ← Previous
              </button>

              <span style={paginationStatusTextStyle}>
                Page <strong style={{ color: "#0f172a" }}>{currentPage}</strong> of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={paginationButtonStyle(currentPage === totalPages)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// --- STYLING Core Core ---

const dashboardWrapperStyle = {
  position: "relative",
  minHeight: "100vh",
  backgroundColor: "#f4f7fa",
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  overflow: "hidden",
  width: "100%",
};

const glowLeftStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, #e0e7ff 0%, rgba(244,247,250,0) 70%)",
  top: "-200px",
  left: "-150px",
  zIndex: 1,
};

const glowRightStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, #fdf2f8 0%, rgba(244,247,250,0) 70%)",
  bottom: "50px",
  right: "-150px",
  zIndex: 1,
};

const contentContainerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "40px 20px 80px 20px",
  position: "relative",
  zIndex: 10,
};

const headerAreaStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "36px",
  flexWrap: "wrap",
  gap: "20px",
};

const headerActionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const badgeTopStyle = {
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.5px",
  color: "#4f46e5",
  display: "block",
  marginBottom: "8px",
};

const mainHeadingStyle = {
  fontSize: "36px",
  fontWeight: "900",
  color: "#0f172a",
  margin: 0,
  letterSpacing: "-1px",
};

const subheadingStyle = {
  margin: "6px 0 0 0",
  color: "#64748b",
  fontSize: "15px",
  fontWeight: "500",
};

const countBadgeStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  border: "1px solid #e2e8f0",
  padding: "10px 18px",
  borderRadius: "14px",
  fontSize: "14px",
  color: "#475569",
  fontWeight: "600",
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.02)",
};

const logoutButtonStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #fee2e2",
  color: "#ef4444", // Modern crimson-red text accent color
  padding: "10px 18px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  boxShadow: "0 4px 10px rgba(239, 68, 68, 0.03)",
  transition: "all 0.15s ease",
};

const matchGlassCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  padding: "24px 28px",
  marginBottom: "24px",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(15, 23, 42, 0.05)",
  paddingBottom: "16px",
  marginBottom: "20px",
};

const tournamentTagStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#1e293b",
  backgroundColor: "#ffffff",
  padding: "6px 14px",
  borderRadius: "99px",
  border: "1px solid #e2e8f0",
};

const dateTagStyle = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#94a3b8",
  letterSpacing: "0.5px",
};

const scorePanelGridStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
};

const teamFlexRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flex: "2",
  minWidth: "240px",
};

const teamAvatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  backgroundColor: "#eff6ff",
  color: "#2563eb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "800",
  fontSize: "15px",
  border: "1px solid rgba(0,0,0,0.03)",
};

const teamNameStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const scoreInputStyle = {
  width: "64px",
  height: "48px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#ffffff",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "800",
  color: "#0f172a",
  outline: "none",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
};

const vsDividerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "36px",
  height: "36px",
  borderRadius: "99px",
  backgroundColor: "rgba(15, 23, 42, 0.04)",
};

const vsTextStyle = {
  fontSize: "11px",
  fontWeight: "900",
  color: "#94a3b8",
  letterSpacing: "0.5px",
};

const actionBlockStyle = {
  flex: "1",
  minWidth: "150px",
  display: "flex",
  justifyContent: "flex-end",
};

const submitActionButtonStyle = {
  width: "100%",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  border: "none",
  borderRadius: "14px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
};

const emptyGlassCardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  padding: "60px 40px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.03)",
};

const emptyIconStyle = {
  fontSize: "44px",
  marginBottom: "16px",
};

const paginationWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop: "40px",
};

const paginationStatusTextStyle = {
  fontSize: "14px",
  color: "#64748b",
  fontWeight: "500",
};

const paginationButtonStyle = (disabled) => ({
  backgroundColor: disabled ? "rgba(0,0,0,0.02)" : "#ffffff",
  color: disabled ? "#cbd5e1" : "#475569",
  border: "1px solid",
  borderColor: disabled ? "#e2e8f0" : "#cbd5e1",
  borderRadius: "12px",
  padding: "10px 18px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: disabled ? "not-allowed" : "pointer",
  boxShadow: disabled ? "none" : "0 2px 4px rgba(0,0,0,0.02)",
});

export default MatchScoreEntry;