import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getTournaments,
  createTournament,
  deleteTournament,
  addTeamToTournament,
  getTournamentTeams,
  removeTournamentTeam,
} from "../services/tournamentService";

import {
  getTeams,
} from "../services/teamService";

const Tournaments = () => {

  const [tournaments, setTournaments] =
    useState([]);

  const [teams, setTeams] =
    useState([]);

  const [selectedTeams, setSelectedTeams] =
    useState({});

  const [tournamentTeams, setTournamentTeams] =
    useState({});

  const [form, setForm] = useState({
    name: "",
    season: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {

    loadTournaments();

    loadTeams();

  }, []);

  const loadTournaments =
    async () => {

      try {

        const data =
          await getTournaments();

        setTournaments(data);

        data.forEach((t) => {
          loadTournamentTeams(t.id);
        });

      } catch (error) {

        console.error(error);
      }
    };

  const loadTeams =
    async () => {

      try {

        const data =
          await getTeams();

        setTeams(data);

      } catch (error) {

        console.error(error);
      }
    };

  const loadTournamentTeams =
    async (tournamentId) => {

      try {

        const data =
          await getTournamentTeams(
            tournamentId
          );

        setTournamentTeams(
          (prev) => ({
            ...prev,
            [tournamentId]: data,
          })
        );

      } catch (error) {

        console.error(error);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createTournament(
          form
        );

        alert(
          "Tournament created successfully"
        );

        setForm({
          name: "",
          season: "",
          startDate: "",
          endDate: "",
        });

        loadTournaments();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create tournament"
        );
      }
    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this tournament?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deleteTournament(id);

        alert(
          "Tournament deleted successfully"
        );

        setTournaments((prev) =>
          prev.filter(
            (t) => t.id !== id
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete tournament"
        );
      }
    };

  const handleAddTeam =
    async (tournamentId) => {

      try {

        const teamId =
          selectedTeams[
            tournamentId
          ];

        if (!teamId) {

          alert(
            "Select a team"
          );

          return;
        }

        await addTeamToTournament(
          tournamentId,
          teamId
        );

        alert(
          "Team added successfully"
        );

        loadTournamentTeams(
          tournamentId
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to add team"
        );
      }
    };

  const handleRemoveTeam =
    async (
      tournamentId,
      teamId
    ) => {

      const confirmed =
        window.confirm(
          "Remove this team from tournament?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await removeTournamentTeam(
          tournamentId,
          teamId
        );

        alert(
          "Team removed successfully"
        );

        loadTournamentTeams(
          tournamentId
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to remove team"
        );
      }
    };

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
            Tournaments
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Manage tournaments and teams
          </p>

        </div>

        {/* CREATE TOURNAMENT */}

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
            Create Tournament
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

            <input
              type="text"
              placeholder="Tournament Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Season"
              value={form.season}
              onChange={(e) =>
                setForm({
                  ...form,
                  season:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="date"
              lang="en"
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <input
              type="date"
              lang="en"
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Tournament
            </button>

          </form>

        </div>

        {/* TOURNAMENT LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          {tournaments.map(
            (tournament) => (

              <div
                key={tournament.id}
                style={{
                  background:
                    "white",

                  borderRadius:
                    "18px",

                  padding: "24px",

                  boxShadow:
                    "0 4px 14px rgba(0,0,0,0.06)",
                }}
              >

                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >

                  <div>

                    <h2
                      style={{
                        margin: 0,
                        color:
                          "#111827",
                      }}
                    >
                      {
                        tournament.name
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#6b7280",
                        marginTop:
                          "8px",
                      }}
                    >
                      Season:
                      {" "}
                      {
                        tournament.season
                      }
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        tournament.id
                      )
                    }
                    style={{
                      background:
                        "#ef4444",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px 18px",
                      borderRadius:
                        "10px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "600",
                    }}
                  >
                    Delete
                  </button>

                </div>

                {/* ADD TEAM */}

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop:
                      "20px",
                    flexWrap:
                      "wrap",
                  }}
                >

                  <select
                    onChange={(e) =>
                      setSelectedTeams({
                        ...selectedTeams,

                        [tournament.id]:
                          e.target
                            .value,
                      })
                    }
                    style={inputStyle}
                  >

                    <option value="">
                      Select Team
                    </option>

                    {teams.map(
                      (team) => (

                        <option
                          key={
                            team.id
                          }
                          value={
                            team.id
                          }
                        >
                          {
                            team.name
                          }
                        </option>

                      )
                    )}

                  </select>

                  <button
                    onClick={() =>
                      handleAddTeam(
                        tournament.id
                      )
                    }
                    style={
                      buttonStyle
                    }
                  >
                    Add Team
                  </button>

                </div>

                {/* TEAM LIST */}

                <div
                  style={{
                    marginTop:
                      "24px",
                  }}
                >

                  <h3
                    style={{
                      marginBottom:
                        "14px",
                      color:
                        "#111827",
                    }}
                  >
                    Teams
                  </h3>

                  <div
                    style={{
                      display:
                        "flex",
                      flexWrap:
                        "wrap",
                      gap: "12px",
                    }}
                  >

                    {tournamentTeams[
                      tournament.id
                    ]?.length >
                    0 ? (

                      tournamentTeams[
                        tournament.id
                      ].map(
                        (team) => (

                          <div
                            key={
                              team.teamId
                            }
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap:
                                "10px",
                              background:
                                "#f3f4f6",
                              padding:
                                "10px 14px",
                              borderRadius:
                                "12px",
                            }}
                          >

                            <span
                              style={{
                                fontWeight:
                                  "600",
                              }}
                            >
                              {
                                team.teamName
                              }
                            </span>

                            <button
                              onClick={() =>
                                handleRemoveTeam(
                                  tournament.id,
                                  team.teamId
                                )
                              }
                              style={{
                                background:
                                  "transparent",
                                border:
                                  "none",
                                color:
                                  "#ef4444",
                                cursor:
                                  "pointer",
                                fontWeight:
                                  "700",
                              }}
                            >
                              ✕
                            </button>

                          </div>

                        )
                      )

                    ) : (

                      <p
                        style={{
                          color:
                            "#9ca3af",
                        }}
                      >
                        No teams added
                      </p>

                    )}

                  </div>

                </div>

              </div>
            )
          )}

        </div>

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

export default Tournaments;