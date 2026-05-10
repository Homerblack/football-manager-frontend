import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >

      <h2>Futsal Admin</h2>

      <hr />

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >

        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/teams" style={linkStyle}>
          Teams
        </Link>

        <Link to="/tournaments" style={linkStyle}>
          Tournaments
        </Link>

        <Link to="/matches" style={linkStyle}>
          Matches
        </Link>

        <Link to="/match-results" style={linkStyle}>
          Match Results
        </Link>
        <Link
  to="/score-entry"
  style={linkStyle}
>
  Score Entry
</Link>

<Link
  to="/approvals"
  style={linkStyle}
>
  Approvals
</Link>

        <li>
  <Link to="/standings">
    Standings
  </Link>
</li>

      </nav>

    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};

export default Sidebar;