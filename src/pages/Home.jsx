import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getTournaments,
} from "../services/tournamentService";

const Home = () => {

  const navigate = useNavigate();

  const [tournaments, setTournaments] =
    useState([]);

  useEffect(() => {

    loadTournaments();

  }, []);

  const loadTournaments = async () => {

    try {

      const data =
        await getTournaments();

      setTournaments(

        Array.isArray(data)
          ? data
          : data.content || []

      );

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div style={pageWrapperStyle}>

      {/* BACKGROUND GLOWS */}

      <div style={glowLeftStyle} />
      <div style={glowRightStyle} />

      <div style={contentContainerStyle}>

        {/* HERO SECTION */}

        <div style={heroSectionStyle}>

          <span style={heroBadgeStyle}>
            ⚽ LIVE E-FOOTBALL LEAGUE
          </span>

          <h1 style={heroHeadingStyle}>
            Ajit Bipin Subarna
            <br />
            E-Football Tournament
          </h1>

          <p style={heroSubheadingStyle}>
            Real-time standings, match tracking,
            tournament stats, and live competition management.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            style={loginButtonStyle}
          >

            🚪 Admin Login

          </button>

        </div>

        {/* SECTION HEADER */}

        <div style={sectionHeaderStyle}>

          <div>

            <span style={sectionBadgeStyle}>
              🏆 ACTIVE COMPETITIONS
            </span>

            <h2 style={sectionTitleStyle}>
              Tournaments
            </h2>

          </div>

          <div style={countBadgeStyle}>

            <span style={{
              fontWeight: "800",
            }}>
              {tournaments.length}
            </span>{" "}

            Active

          </div>

        </div>

        {/* TOURNAMENT GRID */}

        <div style={gridStyle}>

          {tournaments.map(
            (tournament) => (

            <div
              key={tournament.id}
              onClick={() =>
                navigate(
                  `/public-standings/${tournament.id}`
                )
              }
              style={cardStyle}
              onMouseOver={(e) => {

                e.currentTarget.style.transform =
                  "translateY(-6px)";

                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(15,23,42,0.08)";
              }}
              onMouseOut={(e) => {

                e.currentTarget.style.transform =
                  "translateY(0px)";

                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(15,23,42,0.04)";
              }}
            >

              {/* TOP CARD */}

              <div style={cardTopStyle}>

                <div style={leagueIconStyle}>
                  ⚽
                </div>

                <div style={seasonBadgeStyle}>
                  {tournament.season}
                </div>

              </div>

              {/* CONTENT */}

              <h2 style={cardTitleStyle}>
                {tournament.name}
              </h2>

              <p style={dateStyle}>

                📅 {tournament.startDate}
                {" "}→{" "}
                {tournament.endDate}

              </p>

              {/* BUTTONS */}

              <div style={buttonRowStyle}>

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    navigate(
                      `/public-standings/${tournament.id}`
                    );

                  }}
                  style={standingsButtonStyle}
                >

                  📊 Standings

                </button>

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    navigate(
                      `/public-matches/${tournament.id}`
                    );

                  }}
                  style={matchesButtonStyle}
                >

                  ⚔️ Matches

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

/* ---------------- STYLES ---------------- */

const pageWrapperStyle = {
  minHeight: "100vh",
  backgroundColor: "#f4f7fa",
  position: "relative",
  overflow: "hidden",
  fontFamily:
    '"Inter", system-ui, sans-serif',
};

const glowLeftStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, #dbeafe 0%, transparent 70%)",
  top: "-250px",
  left: "-180px",
};

const glowRightStyle = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, #fce7f3 0%, transparent 70%)",
  bottom: "-250px",
  right: "-180px",
};

const contentContainerStyle = {
  position: "relative",
  zIndex: 10,
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "50px 20px 80px",
};

const heroSectionStyle = {
  textAlign: "center",
  marginBottom: "70px",
};

const heroBadgeStyle = {
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.5px",
  color: "#4f46e5",
};

const heroHeadingStyle = {
  fontSize: "clamp(38px, 8vw, 72px)",
  lineHeight: "1.05",
  fontWeight: "900",
  color: "#0f172a",
  marginTop: "18px",
  marginBottom: "20px",
};

const heroSubheadingStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#64748b",
};

const loginButtonStyle = {
  marginTop: "30px",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  border: "none",
  borderRadius: "18px",
  padding: "16px 30px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow:
    "0 10px 20px rgba(15,23,42,0.12)",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "30px",
};

const sectionBadgeStyle = {
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.5px",
  color: "#6366f1",
};

const sectionTitleStyle = {
  fontSize: "36px",
  fontWeight: "900",
  margin: "10px 0 0 0",
  color: "#0f172a",
};

const countBadgeStyle = {
  backgroundColor:
    "rgba(255,255,255,0.75)",
  border: "1px solid #e2e8f0",
  padding: "12px 18px",
  borderRadius: "16px",
  fontSize: "14px",
  color: "#475569",
  backdropFilter: "blur(20px)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "26px",
};

const cardStyle = {
  backgroundColor:
    "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "28px",
  border:
    "1px solid rgba(255,255,255,0.55)",
  padding: "28px",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow:
    "0 10px 30px rgba(15,23,42,0.04)",
};

const cardTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const leagueIconStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  backgroundColor: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const seasonBadgeStyle = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "700",
  color: "#475569",
};

const cardTitleStyle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#0f172a",
  marginBottom: "16px",
  lineHeight: "1.3",
};

const dateStyle = {
  color: "#64748b",
  fontSize: "14px",
  marginBottom: "28px",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const standingsButtonStyle = {
  flex: 1,
  minWidth: "140px",
  border: "none",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  padding: "14px 18px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

const matchesButtonStyle = {
  flex: 1,
  minWidth: "140px",
  border: "none",
  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#ffffff",
  padding: "14px 18px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

export default Home;