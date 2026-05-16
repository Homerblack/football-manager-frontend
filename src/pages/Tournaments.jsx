import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// Assumed service imports based on your teamService structure
import { getTournaments, createTournament, deleteTournament } from "../services/tournamentService"; 

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState({ name: "", type: "Knockout" }); // e.g., Knockout, League

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      await createTournament(form);
      setForm({ name: "", type: "Knockout" });
      loadTournaments();
    } catch (err) {
      console.error(err);
      alert("Failed to create tournament");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tournament?");
    if (!confirmed) return;

    try {
      await deleteTournament(id);
      setTournaments((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete tournament");
    }
  };

  return (
    <Layout>
      <div style={pageContainerStyle}>
        
        {/* CURRENT PAGE INDICATOR HEADER */}
        <div style={headerSectionStyle}>
          <span style={pageBadgeStyle}>CHAMPIONSHIPS</span>
          <h1 style={mainTitleStyle}>Tournaments</h1>
          <p style={subtitleStyle}>Create brackets, view active events, and manage system cups.</p>
        </div>

        {/* CREATE TOURNAMENT CARD */}
        <div style={formCardStyle}>
          <h2 style={cardTitleStyle}>Setup New Tournament</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>TOURNAMENT NAME</label>
              <input
                type="text"
                placeholder="e.g. Champions League 2026"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>COMPETITION FORMAT</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={selectStyle}
              >
                <option value="Knockout">Knockout (Brackets)</option>
                <option value="League">League (Points Table)</option>
                <option value="Group + Knockout">Group Stage + Knockout</option>
              </select>
            </div>

            <button type="submit" style={primaryButtonStyle}>
              Initialize Tournament
            </button>
          </form>
        </div>

        {/* ACTIVE LIST COUNTER */}
        <div style={listHeaderStyle}>
          <span>Live Competitions</span>
          <span style={countBadgeStyle}>{tournaments.length} Active</span>
        </div>

        {/* TOURNAMENT LIST */}
        <div style={listStyle}>
          {tournaments.length === 0 ? (
            <div style={emptyStateStyle}>
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>🏆</span>
              <p style={{ margin: 0 }}>No tournaments created yet. Setup your first championship above.</p>
            </div>
          ) : (
            tournaments.map((tournament) => (
              <div key={tournament.id} style={tournamentCardStyle}>
                <div style={metaStyle}>
                  <div style={tagRowStyle}>
                    <span style={typeBadgeStyle(tournament.type)}>{tournament.type}</span>
                    <span style={idTagStyle}>ID: #{tournament.id}</span>
                  </div>
                  <h3 style={tournamentNameStyle}>{tournament.name}</h3>
                </div>
                
                <button
                  onClick={() => handleDelete(tournament.id)}
                  style={deleteButtonStyle}
                >
                  End Event
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
};

// --- STYLING (MATCHING THE CRISP LIGHT THEME) ---

const pageContainerStyle = {
  maxWidth: "580px",
  margin: "0 auto",
  fontFamily: 'system-ui, -apple-system, sans-serif',
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
};

const selectStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  outline: "none",
  cursor: "pointer",
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

const tournamentCardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "16px",
  border: "1px solid #e2e8f0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
};

const metaStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const tagRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const typeBadgeStyle = (type) => ({
  backgroundColor: type === "Knockout" ? "#fef3c7" : type === "League" ? "#dcfce7" : "#f3e8ff",
  color: type === "Knockout" ? "#92400e" : type === "League" ? "#166534" : "#6b21a8",
  fontSize: "11px",
  fontWeight: "700",
  padding: "2px 6px",
  borderRadius: "6px",
});

const idTagStyle = {
  fontSize: "11px",
  color: "#94a3b8",
  fontFamily: "monospace",
};

const tournamentNameStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "600",
  color: "#0f172a",
};

const deleteButtonStyle = {
  backgroundColor: "#fff5f5",
  color: "#e53e3e",
  border: "1px solid #fed7d7",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
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

export default Tournaments;