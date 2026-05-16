import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getTeams, createTeam, deleteTeam } from "../services/teamService";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({ name: "", shortName: "" });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.shortName.trim()) return;

    try {
      await createTeam(form);
      setForm({ name: "", shortName: "" });
      loadTeams();
    } catch (err) {
      console.error(err);
      alert("Failed to create team");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this team?");
    if (!confirmed) return;

    try {
      await deleteTeam(id);
      setTeams((prev) => prev.filter((team) => team.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete team");
    }
  };

  return (
    <Layout>
      <div style={pageContainerStyle}>
        
        {/* HEADER SECTION */}
        <div style={headerSectionStyle}>
          <h1 style={mainTitleStyle}>Tournament Squads</h1>
          <p style={subtitleStyle}>Register, view, and manage active clubs in the system.</p>
        </div>

        {/* CREATE TEAM SECTION */}
        <div style={formCardStyle}>
          <h2 style={cardTitleStyle}>Create New Team</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>TEAM NAME</label>
              <input
                type="text"
                placeholder="e.g. Real Madrid"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>SHORT CODE / TAG</label>
              <input
                type="text"
                placeholder="e.g. RMA"
                maxLength={5}
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                style={inputStyle}
              />
            </div>

            <button type="submit" style={primaryButtonStyle}>
              Add to Roster
            </button>
          </form>
        </div>

        {/* TEAMS LIST COUNTER */}
        <div style={listHeaderStyle}>
          <span>Active Teams</span>
          <span style={countBadgeStyle}>{teams.length} Registered</span>
        </div>

        {/* TEAM ROSTER LIST */}
        <div style={listStyle}>
          {teams.length === 0 ? (
            <div style={emptyStateStyle}>
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>🛡️</span>
              <p style={{ margin: 0 }}>No teams found. Use the form above to add your first squad.</p>
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id} style={teamCardStyle}>
                <div style={teamMetaStyle}>
                  <div style={tagRowStyle}>
                    <span style={shortNameBadgeStyle}>{team.shortName.toUpperCase()}</span>
                    <span style={idTagStyle}>ID: #{team.id}</span>
                  </div>
                  <h3 style={teamNameStyle}>{team.name}</h3>
                </div>
                
                <button
                  onClick={() => handleDelete(team.id)}
                  style={deleteButtonStyle}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
};

// --- STYLING (PREMIUM MODERN LIGHT THEME) ---

const pageContainerStyle = {
  maxWidth: "580px", // Snug workspace width optimized perfectly for centering on mobile viewports
  margin: "0 auto",
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const headerSectionStyle = {
  marginBottom: "24px",
};

const mainTitleStyle = {
  fontSize: "26px",
  fontWeight: "800",
  color: "#0f172a", // Deep elegant slate black
  margin: "0 0 6px 0",
  letterSpacing: "-0.5px",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#64748b", // Light subtle slate gray description
  margin: 0,
};

const formCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.03), 0 2px 4px -2px rgba(15, 23, 42, 0.03)",
  marginBottom: "28px",
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

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.5px",
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  outline: "none",
  transition: "all 0.15s ease",
  WebkitAppearance: "none",
};

const primaryButtonStyle = {
  backgroundColor: "#2563eb", // Vibrant premium system blue
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "14px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "4px",
  transition: "background-color 0.2s ease",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
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

const teamCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "16px",
  border: "1px solid #e2e8f0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.01)",
};

const teamMetaStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const tagRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const shortNameBadgeStyle = {
  backgroundColor: "#edf2f7",
  color: "#2b6cb0", // Contrast slate blue badge for codes
  fontSize: "11px",
  fontWeight: "700",
  padding: "2px 6px",
  borderRadius: "6px",
  letterSpacing: "0.5px",
};

const idTagStyle = {
  fontSize: "11px",
  color: "#94a3b8",
  fontFamily: "monospace",
};

const teamNameStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "600",
  color: "#0f172a",
};

const deleteButtonStyle = {
  backgroundColor: "#fff5f5",
  color: "#e53e3e", // Soft premium delete styling (not overly aggressive)
  border: "1px solid #fed7d7",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.15s ease",
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

export default Teams;