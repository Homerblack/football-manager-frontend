import Layout from "../components/Layout";

const Dashboard = () => {
  // Static placeholders for now—you can later map these to your service.length states!
  return (
    <Layout>
      <div style={pageContainerStyle}>
        
        {/* CURRENT PAGE INDICATOR HEADER */}
        <div style={headerSectionStyle}>
          <span style={pageBadgeStyle}>OVERVIEW & METRICS</span>
          <h1 style={mainTitleStyle}>Dashboard</h1>
          <p style={subtitleStyle}>Real-time system statistics and tournament activity tracking.</p>
        </div>

        {/* ANALYTICS CARD GRID */}
        <div style={gridStyle}>
          <Card title="Teams" value="0" icon="🛡️" label="Registered Squads" color="#3b82f6" />
          <Card title="Tournaments" value="0" icon="🏆" label="Active Leagues" color="#f59e0b" />
          <Card title="Matches" value="0" icon="⚽" label="Scheduled Fixtures" color="#10b981" />
        </div>

      </div>
    </Layout>
  );
};

// --- REUSABLE SUB-CARD COMPONENT ---
const Card = ({ title, value, icon, label, color }) => {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderRowStyle}>
        <span style={cardTitleStyle}>{title.toUpperCase()}</span>
        <div style={iconCircleStyle(color)}>{icon}</div>
      </div>
      
      <div style={counterContainerStyle}>
        <h1 style={valueTextStyle}>{value}</h1>
        <span style={cardLabelStyle}>{label}</span>
      </div>
    </div>
  );
};

// --- STYLING (PREMIUM MODULAR LIGHT DESIGN) ---

const pageContainerStyle = {
  maxWidth: "580px", // Keeping the exact layout container width as your forms for crisp centering
  margin: "0 auto",
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const headerSectionStyle = {
  marginBottom: "28px",
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

const gridStyle = {
  display: "flex",
  flexDirection: "column", // Stacks perfectly on mobile phones
  gap: "16px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.02), 0 2px 4px -2px rgba(15, 23, 42, 0.02)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const cardHeaderRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const cardTitleStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.5px",
};

const iconCircleStyle = (color) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: `${color}10`, // Adds a smooth 10% opacity backdrop behind the icon tint
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
});

const counterContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const valueTextStyle = {
  margin: 0,
  fontSize: "36px",
  fontWeight: "800",
  color: "#0f172a",
  letterSpacing: "-1px",
  lineHeight: "1",
};

const cardLabelStyle = {
  fontSize: "13px",
  color: "#64748b",
  fontWeight: "500",
};

export default Dashboard;