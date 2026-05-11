import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getMatches,
  createMatch,
  deleteMatch,
} from "../services/matchService";

import {
  getTournaments,
  getTournamentTeams,
} from "../services/tournamentService";

const Matches = () => {

  const [matches, setMatches] =
    useState([]);

  const [tournaments, setTournaments] =
    useState([]);

  const [teams, setTeams] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

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

      const data =
        await getMatches();

      // SORT NEWEST DATE FIRST
      const sorted =
        [...data].sort(
          (a, b) =>
            new Date(b.matchDate) -
            new Date(a.matchDate)
        );

      setMatches(sorted);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load matches"
      );
    }
  };

  const loadTournaments = async () => {

    try {

      const data =
        await getTournaments();

      setTournaments(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleTournamentChange =
    async (tournamentId) => {

      setForm({
        ...form,
        tournamentId,
      });

      try {

        const data =
          await getTournamentTeams(
            tournamentId
          );

        setTeams(data);

      } catch (error) {

        console.error(error);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        form.homeTeamId ===
        form.awayTeamId
      ) {

        alert(
          "Home and Away teams cannot be same"
        );

        return;
      }

      try {

        await createMatch(form);

        alert(
          "Match created successfully"
        );

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

        alert(
          "Failed to create match"
        );
      }
    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete this match?"
        );

      if (!confirmed) return;

      try {

        await deleteMatch(id);

        setMatches((prev) =>
          prev.filter(
            (m) => m.id !== id
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete match"
        );
      }
    };

  // PAGINATION
  const paginatedMatches =
    useMemo(() => {

      const start =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      return matches.slice(
        start,
        start + ITEMS_PER_PAGE
      );

    }, [matches, currentPage]);

  const totalPages = Math.ceil(
    matches.length /
    ITEMS_PER_PAGE
  );

  return (

    <Layout>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >

          <h1
            style={{
              fontSize: "34px",
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            Matches
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Create and manage tournament matches
          </p>

        </div>

        {/* CREATE MATCH */}

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "30px",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Create Match
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "16px",
            }}
          >

            {/* TOURNAMENT */}

            <select
              value={form.tournamentId}
              onChange={(e) =>
                handleTournamentChange(
                  e.target.value
                )
              }
              style={inputStyle}
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

            {/* HOME TEAM */}

            <select
              value={form.homeTeamId}
              onChange={(e) =>
                setForm({
                  ...form,
                  homeTeamId:
                    e.target.value,
                })
              }
              style={inputStyle}
            >

              <option value="">
                Home Team
              </option>

              {teams.map((team) => (

                <option
                  key={team.teamId}
                  value={team.teamId}
                >
                  {team.teamName}
                </option>

              ))}

            </select>

            {/* AWAY TEAM */}

            <select
              value={form.awayTeamId}
              onChange={(e) =>
                setForm({
                  ...form,
                  awayTeamId:
                    e.target.value,
                })
              }
              style={inputStyle}
            >

              <option value="">
                Away Team
              </option>

              {teams.map((team) => (

                <option
                  key={team.teamId}
                  value={team.teamId}
                >
                  {team.teamName}
                </option>

              ))}

            </select>

            {/* DATE */}

            <input
              type="date"
              value={form.matchDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  matchDate:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            {/* BUTTON */}

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Match
            </button>

          </form>

        </div>

        {/* MATCH LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >

          {paginatedMatches.map((match) => {

            const hasScore =
              match.homeScore !== null &&
              match.awayScore !== null;

            return (

              <div
                key={match.id}
                style={{
                  background: "white",
                  borderRadius: "18px",
                  padding: "22px",
                  boxShadow:
                    "0 4px 14px rgba(0,0,0,0.06)",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >

                <div>

                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom: "6px",
                    }}
                  >
                    {match.tournamentName}
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      color: "#111827",
                    }}
                  >
                    {match.homeTeam}

                    <span
                      style={{
                        margin: "0 10px",
                        color: "#9ca3af",
                      }}
                    >
                      vs
                    </span>

                    {match.awayTeam}
                  </h2>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#6b7280",
                    }}
                  >
                    {match.matchDate}
                  </p>

                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >

                  {/* SCORE */}

                  <div
                    style={{
                      background:
                        hasScore
                          ? "#ecfdf5"
                          : "#f3f4f6",

                      color:
                        hasScore
                          ? "#065f46"
                          : "#6b7280",

                      padding:
                        "10px 18px",

                      borderRadius: "12px",

                      fontWeight: "700",

                      fontSize: "18px",
                    }}
                  >

                    {hasScore
                      ? `${match.homeScore} - ${match.awayScore}`
                      : "Not Played"}

                  </div>

                  {/* DELETE BUTTON */}

                  {!hasScore && (

                    <button
                      onClick={() =>
                        handleDelete(match.id)
                      }
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding:
                          "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </button>

                  )}

                </div>

              </div>
            );
          })}

        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              gap: "14px",
              marginTop: "30px",
            }}
          >

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
              style={paginationButton}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              style={paginationButton}
            >
              Next
            </button>

          </div>

        )}

      </div>

    </Layout>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

const buttonStyle = {
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: "12px",
  padding: "12px 18px",
  cursor: "pointer",
  fontWeight: "600",
};

const paginationButton = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Matches;