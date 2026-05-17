import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  getStandings,
} from "../services/matchService";

import {
  getTournaments,
} from "../services/tournamentService";

const Standings = () => {

  const [tournaments, setTournaments] =
    useState([]);

  const [selectedTournament,
    setSelectedTournament] =
    useState("");

  const [standings, setStandings] =
    useState([]);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 768);

  useEffect(() => {

    loadTournaments();

    const handleResize = () => {

      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  const loadTournaments = async () => {

    try {

      const data =
        await getTournaments();

      setTournaments(data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load tournaments"
      );
    }
  };

  const handleTournamentChange =
    async (tournamentId) => {

      try {

        setSelectedTournament(
          tournamentId
        );

        if (!tournamentId) {

          setStandings([]);

          return;
        }

        const data =
          await getStandings(
            tournamentId
          );

        setStandings(data);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load standings"
        );
      }
    };

  const calculateWinRate = (
    wins,
    played
  ) => {

    if (!played || played === 0)
      return "0%";

    return `${Math.round(
      (wins / played) * 100
    )}%`;
  };

  return (

    <Layout>

      <div style={pageStyle}>

        <div style={glowLeftStyle} />
        <div style={glowRightStyle} />

        <div style={contentStyle}>

          {/* HEADER */}

          <div style={headerStyle}>

            <div>

              <span style={badgeStyle}>
                📊 LIVE TABLE
              </span>

              <h1 style={headingStyle}>
                Tournament Standings
              </h1>

              <p style={subheadingStyle}>
                Live rankings and team statistics
              </p>

            </div>

          </div>

          {/* TOURNAMENT SELECT */}

          <div style={selectWrapperStyle}>

            <select
              value={selectedTournament}
              onChange={(e) =>
                handleTournamentChange(
                  e.target.value
                )
              }
              style={selectStyle}
            >

              <option value="">
                Select Tournament
              </option>

              {tournaments.map((t) => (

                <option
                  key={t.id}
                  value={t.id}
                >
                  {t.name}
                </option>

              ))}

            </select>

          </div>

          {/* EMPTY STATE */}

          {standings.length === 0 ? (

            <div style={emptyCardStyle}>

              <div style={{
                fontSize: "48px",
                marginBottom: "12px",
              }}>
                🏆
              </div>

              <h2 style={{
                margin: 0,
                color: "#0f172a",
              }}>
                No Standings Yet
              </h2>

              <p style={{
                color: "#64748b",
              }}>
                Select a tournament
              </p>

            </div>

          ) : isMobile ? (

            /* MOBILE CARDS */

            <div style={mobileCardsWrapperStyle}>

              {standings.map(
                (team, index) => (

                <div
                  key={index}
                  style={
                    mobileCardStyle(
                      index
                    )
                  }
                >

                  <div style={
                    mobileTopRowStyle
                  }>

                    <div style={
                      rankStyle(index)
                    }>
                      #{index + 1}
                    </div>

                    <div>

                      <div style={
                        teamNameStyle
                      }>
                        {team.team}
                      </div>

                      <div style={
                        pointsStyle
                      }>
                        {team.points} pts
                      </div>

                    </div>

                  </div>

                  <div style={
                    mobileStatsGridStyle
                  }>

                    <Stat
                      label="Played"
                      value={team.played}
                    />

                    <Stat
                      label="Wins"
                      value={team.wins}
                    />

                    <Stat
                      label="Draws"
                      value={team.draws}
                    />

                    <Stat
                      label="Losses"
                      value={team.losses}
                    />

                    <Stat
                      label="GF"
                      value={team.goalsFor}
                    />

                    <Stat
                      label="GA"
                      value={team.goalsAgainst}
                    />

                    <Stat
                      label="GD"
                      value={team.goalDifference}
                    />

                    <div style={statCardStyle}>

                      <div style={statLabelStyle}>
                        Win Rate
                      </div>

                      <div style={
                        mobileWinRateWrapperStyle
                      }>

                        <div
                          style={{
                            ...mobileWinRateFillStyle,
                            width:
                              calculateWinRate(
                                team.wins,
                                team.played
                              ),
                          }}
                        />

                        <span style={
                          mobileWinRateTextStyle
                        }>
                          {
                            calculateWinRate(
                              team.wins,
                              team.played
                            )
                          }
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* DESKTOP TABLE */

            <div style={tableWrapperStyle}>

              <table style={tableStyle}>

                <thead>

                  <tr>

                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Team</th>
                    <th style={thStyle}>P</th>
                    <th style={thStyle}>W</th>
                    <th style={thStyle}>D</th>
                    <th style={thStyle}>L</th>
                    <th style={thStyle}>GF</th>
                    <th style={thStyle}>GA</th>
                    <th style={thStyle}>GD</th>
                    <th style={thStyle}>WR</th>
                    <th style={thStyle}>PTS</th>

                  </tr>

                </thead>

                <tbody>

                  {standings.map(
                    (team, index) => (

                    <tr key={index}>

                      <td style={tdStyle}>
                        #{index + 1}
                      </td>

                      <td style={{
                        ...tdStyle,
                        fontWeight: "700",
                      }}>
                        {team.team}
                      </td>

                      <td style={tdStyle}>
                        {team.played}
                      </td>

                      <td style={tdStyle}>
                        {team.wins}
                      </td>

                      <td style={tdStyle}>
                        {team.draws}
                      </td>

                      <td style={tdStyle}>
                        {team.losses}
                      </td>

                      <td style={tdStyle}>
                        {team.goalsFor}
                      </td>

                      <td style={tdStyle}>
                        {team.goalsAgainst}
                      </td>

                      <td style={tdStyle}>
                        {team.goalDifference}
                      </td>

                      <td style={tdStyle}>

                        <div style={
                          winRateWrapperStyle
                        }>

                          <div
                            style={{
                              ...winRateFillStyle,
                              width:
                                calculateWinRate(
                                  team.wins,
                                  team.played
                                ),
                            }}
                          />

                          <span style={
                            winRateTextStyle
                          }>
                            {
                              calculateWinRate(
                                team.wins,
                                team.played
                              )
                            }
                          </span>

                        </div>

                      </td>

                      <td style={{
                        ...tdStyle,
                        fontWeight: "800",
                      }}>
                        {team.points}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
};

/* SMALL STAT COMPONENT */

const Stat = ({
  label,
  value,
}) => (

  <div style={statCardStyle}>

    <div style={statLabelStyle}>
      {label}
    </div>

    <div style={statValueStyle}>
      {value}
    </div>

  </div>
);

/* STYLES */

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f4f7fa",
  position: "relative",
  overflow: "hidden",
};

const glowLeftStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, #dbeafe 0%, transparent 70%)",
  top: "-200px",
  left: "-100px",
};

const glowRightStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, #fce7f3 0%, transparent 70%)",
  bottom: "-200px",
  right: "-100px",
};

const contentStyle = {
  position: "relative",
  zIndex: 10,
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px 20px 80px",
};

const headerStyle = {
  marginBottom: "30px",
};

const badgeStyle = {
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.5px",
  color: "#4f46e5",
};

const headingStyle = {
  fontSize: "38px",
  fontWeight: "900",
  color: "#0f172a",
  margin: "8px 0",
};

const subheadingStyle = {
  color: "#64748b",
  margin: 0,
};

const selectWrapperStyle = {
  marginBottom: "30px",
};

const selectStyle = {
  width: "100%",
  maxWidth: "320px",
  padding: "14px 18px",
  borderRadius: "16px",
  border: "1px solid #cbd5e1",
  backgroundColor: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  fontSize: "15px",
  fontWeight: "600",
};

const tableWrapperStyle = {
  overflowX: "auto",
  backgroundColor: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "16px",
  fontSize: "13px",
  color: "#64748b",
  borderBottom:
    "1px solid rgba(0,0,0,0.06)",
};

const tdStyle = {
  padding: "18px 16px",
  borderBottom:
    "1px solid rgba(0,0,0,0.04)",
  fontSize: "14px",
  color: "#334155",
};

const mobileCardsWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const mobileCardStyle = (index) => ({
  backgroundColor:
    "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "20px",
  border:
    index < 3
      ? "1px solid rgba(99,102,241,0.2)"
      : "1px solid rgba(255,255,255,0.5)",
  boxShadow:
    "0 10px 30px rgba(15,23,42,0.05)",
});

const mobileTopRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "18px",
};

const rankStyle = (index) => ({
  width: "50px",
  height: "50px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  backgroundColor:
    index === 0
      ? "#fef3c7"
      : index === 1
      ? "#e2e8f0"
      : index === 2
      ? "#fed7aa"
      : "#eff6ff",
});

const teamNameStyle = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#0f172a",
};

const pointsStyle = {
  color: "#6366f1",
  fontWeight: "700",
  marginTop: "4px",
};

const mobileStatsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(2, 1fr)",
  gap: "12px",
};

const statCardStyle = {
  backgroundColor:
    "rgba(15,23,42,0.03)",
  borderRadius: "16px",
  padding: "12px",
};

const statLabelStyle = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "4px",
};

const statValueStyle = {
  fontSize: "16px",
  fontWeight: "800",
  color: "#0f172a",
};

const winRateWrapperStyle = {
  position: "relative",
  width: "90px",
  height: "28px",
  borderRadius: "999px",
  backgroundColor: "#e2e8f0",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const winRateFillStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(90deg, #22c55e, #16a34a)",
  borderRadius: "999px",
};

const winRateTextStyle = {
  position: "relative",
  zIndex: 2,
  fontSize: "12px",
  fontWeight: "800",
  color: "#0f172a",
};

const mobileWinRateWrapperStyle = {
  position: "relative",
  width: "100%",
  height: "30px",
  borderRadius: "999px",
  backgroundColor: "#dbeafe",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mobileWinRateFillStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(90deg, #22c55e, #16a34a)",
  borderRadius: "999px",
};

const mobileWinRateTextStyle = {
  position: "relative",
  zIndex: 2,
  fontSize: "13px",
  fontWeight: "800",
  color: "#0f172a",
};

const emptyCardStyle = {
  backgroundColor:
    "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "60px 30px",
  textAlign: "center",
};

export default Standings;