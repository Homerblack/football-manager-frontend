import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getMatches, createMatch, deleteMatch } from "../services/matchService";
import { getTournaments, getTournamentTeams } from "../services/tournamentService";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [form, setForm] = useState({
    tournamentId: "",
    homeTeamId: "",
    awayTeamId: "",
    matchDate: "",
  });

  useEffect(() => {
    loadMatches();
    loadTournaments();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await getMatches();

      const sorted = [...data].sort(
        (a, b) => new Date(b.matchDate) - new Date(a.matchDate)
      );

      setMatches(sorted);
    } catch (error) {
      console.error(error);
      alert("Failed to load matches");
    }
  };

  const loadTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTournamentChange = async (tournamentId) => {
    setForm({
      ...form,
      tournamentId,
      homeTeamId: "",
      awayTeamId: "",
    });

    if (!tournamentId) {
      setTeams([]);
      return;
    }

    try {
      const data = await getTournamentTeams(tournamentId);
      setTeams(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.tournamentId ||
      !form.homeTeamId ||
      !form.awayTeamId ||
      !form.matchDate
    ) {
      alert("Please fill in all match details");
      return;
    }

    if (form.homeTeamId === form.awayTeamId) {
      alert("Home and Away teams cannot be the same");
      return;
    }

    try {
      await createMatch(form);

      alert("Match scheduled successfully");

      setForm({
        tournamentId: "",
        homeTeamId: "",
        awayTeamId: "",
        matchDate: "",
      });

      setTeams([]);
      loadMatches();
    } catch (error) {
      console.error(error);
      alert("Failed to create match");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this match fixture?");

    if (!confirmed) return;

    try {
      await deleteMatch(id);
      setMatches((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete match");
    }
  };

  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return matches.slice(start, start + ITEMS_PER_PAGE);
  }, [matches, currentPage]);

  const totalPages = Math.ceil(matches.length / ITEMS_PER_PAGE);

  return (
    <Layout>
      <div style={pageContainerStyle}>
        {/* HEADER */}
        <div style={headerSectionStyle}>
          <span style={pageBadgeStyle}>FIXTURES & SCHEDULES</span>

          <h1 style={mainTitleStyle}>Match Day</h1>

          <p style={subtitleStyle}>
            Organize matchups, track scores, and coordinate game schedules.
          </p>
        </div>

        {/* FORM CARD */}
        <div style={formCardStyle}>
          <h2 style={cardTitleStyle}>Schedule New Match</h2>

          <form onSubmit={handleSubmit} style={formStyle}>
            {/* TOURNAMENT */}
            <div style={inputGroupStyle}>
              <label style={labelStyle}>COMPETITION</label>

              <select
                value={form.tournamentId}
                onChange={(e) => handleTournamentChange(e.target.value)}
                style={selectStyle}
              >
                <option value="">Select Tournament</option>

                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TEAMS */}
            <div style={formRowStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>HOME SQUAD</label>

                <select
                  value={form.homeTeamId}
                  disabled={!form.tournamentId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      homeTeamId: e.target.value,
                    })
                  }
                  style={selectStyle}
                >
                  <option value="">Select Home</option>

                  {teams.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>AWAY SQUAD</label>

                <select
                  value={form.awayTeamId}
                  disabled={!form.tournamentId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      awayTeamId: e.target.value,
                    })
                  }
                  style={selectStyle}
                >
                  <option value="">Select Away</option>

                  {teams.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* DATE */}
            <div style={inputGroupStyle}>
              <label style={labelStyle}>KICKOFF DATE</label>

              <input
                type="date"
                value={form.matchDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    matchDate: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>

            <button type="submit" style={primaryButtonStyle}>
              Generate Fixture
            </button>
          </form>
        </div>

        {/* LIST HEADER */}
        <div style={listHeaderStyle}>
          <span>Match Schedule</span>

          <span style={countBadgeStyle}>
            {matches.length} Total
          </span>
        </div>

        {/* MATCH LIST */}
        <div style={listStyle}>
          {paginatedMatches.length === 0 ? (
            <div style={emptyStateStyle}>
              <span
                style={{
                  fontSize: "24px",
                  marginBottom: "8px",
                }}
              >
                ⚽
              </span>

              <p style={{ margin: 0 }}>
                No matches booked. Establish tournament teams and set a kickoff
                time.
              </p>
            </div>
          ) : (
            paginatedMatches.map((match) => {
              const hasScore =
                match.homeScore !== null &&
                match.awayScore !== null;

              return (
                <div key={match.id} style={matchCardStyle}>
                  <div style={matchDetailsStyle}>
                    {/* TAGS */}
                    <div style={tagRowStyle}>
                      <span style={tournamentTagStyle}>
                        {match.tournamentName}
                      </span>

                      <span style={dateTagStyle}>
                        📅 {match.matchDate}
                      </span>
                    </div>

                    {/* SCOREBOARD */}
                    <div style={scoreboardRowStyle}>
                      <div style={teamDisplayStyle}>
                        <span style={teamNameStyle}>
                          {match.homeTeam}
                        </span>

                        <span style={vsStyle}>vs</span>

                        <span style={teamNameStyle}>
                          {match.awayTeam}
                        </span>
                      </div>

                      <div style={scoreBadgeStyle(hasScore)}>
                        {hasScore
                          ? `${match.homeScore} — ${match.awayScore}`
                          : "FT Schedule"}
                      </div>
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  {!hasScore && (
                    <div style={actionRowStyle}>
                      <button
                        onClick={() => handleDelete(match.id)}
                        style={deleteButtonStyle}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={paginationWrapperStyle}>
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              style={paginationButtonStyle(
                currentPage === 1
              )}
            >
              Back
            </button>

            <span style={pageIndicatorTextStyle}>
              Page <b>{currentPage}</b> of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              style={paginationButtonStyle(
                currentPage === totalPages
              )}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

/* ---------------- STYLES ---------------- */

const pageContainerStyle = {
  maxWidth: "580px",
  margin: "0 auto",
  fontFamily: "system-ui, -apple-system, sans-serif",
  width: "100%",
  overflow: "hidden",
};

const headerSectionStyle = {
  marginBottom: "24px",
};

const pageBadgeStyle = {
  fontSize: "10px",
  fontWeight: "800",
  color: "#2563eb",
  backgroundColor: "#eff6ff",
  padding: "4px 8px",
  borderRadius: "6px",
  letterSpacing: "0.5px",
  display: "inline-block",
  marginBottom: "8px",
};

const mainTitleStyle = {
  fontSize: "26px",
  fontWeight: "800",
  color: "#0f172a",
  margin: "0 0 6px 0",
  letterSpacing: "-0.5px",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#64748b",
  margin: 0,
};

const formCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.03)",
  marginBottom: "28px",
  overflow: "hidden",
};

const cardTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0 0 16px 0",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const formRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  minWidth: 0,
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  minWidth: 0,
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.5px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  outline: "none",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  outline: "none",
  cursor: "pointer",

  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const primaryButtonStyle = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "14px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "4px",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
};

const listHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "700",
  color: "#475569",
  marginBottom: "12px",
  padding: "0 4px",
};

const countBadgeStyle = {
  backgroundColor: "#e2e8f0",
  color: "#475569",
  fontSize: "11px",
  padding: "2px 8px",
  borderRadius: "20px",
  fontWeight: "600",
};

const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const matchCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "16px",
  border: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  overflow: "hidden",
};

const matchDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const tagRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
};

const tournamentTagStyle = {
  backgroundColor: "#f1f5f9",
  color: "#475569",
  fontSize: "11px",
  fontWeight: "700",
  padding: "2px 8px",
  borderRadius: "6px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "60%",
};

const dateTagStyle = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: "500",
  whiteSpace: "nowrap",
};

const scoreboardRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
};

const teamDisplayStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "nowrap",
  minWidth: 0,
  overflow: "hidden",
  flex: 1,
};

const teamNameStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#0f172a",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const vsStyle = {
  fontSize: "13px",
  color: "#94a3b8",
  fontWeight: "500",
  flexShrink: 0,
};

const scoreBadgeStyle = (hasScore) => ({
  backgroundColor: hasScore ? "#dcfce7" : "#f1f5f9",
  color: hasScore ? "#156534" : "#64748b",
  fontSize: "13px",
  fontWeight: "700",
  padding: "6px 12px",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  flexShrink: 0,
});

const actionRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px dashed #e2e8f0",
  paddingTop: "10px",
};

const deleteButtonStyle = {
  backgroundColor: "#fff5f5",
  color: "#e53e3e",
  border: "1px solid #fed7d7",
  padding: "6px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600",
};

const emptyStateStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  color: "#94a3b8",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  border: "1px dashed #cbd5e1",
  fontSize: "14px",
};

const paginationWrapperStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  padding: "0 4px",
};

const paginationButtonStyle = (disabled) => ({
  backgroundColor: disabled ? "#f1f5f9" : "#ffffff",
  color: disabled ? "#cbd5e1" : "#334155",
  border: "1px solid #e2e8f0",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.15s ease",
});

const pageIndicatorTextStyle = {
  fontSize: "13px",
  color: "#64748b",
};

export default Matches;