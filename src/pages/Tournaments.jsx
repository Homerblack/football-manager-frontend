import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  getTournaments,
  createTournament,
  deleteTournament,
  addTeamToTournament,
  getTournamentTeams,
  removeTournamentTeam,
} from "../services/tournamentService";

import { getTeams } from "../services/teamService";

const Tournaments = () => {

  const [tournaments, setTournaments] = useState([]);

  const [teams, setTeams] = useState([]);

  const [selectedTeams, setSelectedTeams] = useState({});

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

  const loadTournaments = async () => {

    const data = await getTournaments();

    setTournaments(data);

    data.forEach((t) => {
      loadTournamentTeams(t.id);
    });
  };

  const loadTeams = async () => {

    const data = await getTeams();

    setTeams(data);
  };

  const loadTournamentTeams = async (
    tournamentId
  ) => {

    const data = await getTournamentTeams(
      tournamentId
    );

    setTournamentTeams((prev) => ({
      ...prev,
      [tournamentId]: data,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await createTournament(form);

    setForm({
      name: "",
      season: "",
      startDate: "",
      endDate: "",
    });

    loadTournaments();
  };

  const handleDelete = async (id) => {

    await deleteTournament(id);

    loadTournaments();
  };

  const handleAddTeam = async (
    tournamentId
  ) => {

    const teamId =
      selectedTeams[tournamentId];

    if (!teamId) return;

    await addTeamToTournament(
      tournamentId,
      teamId
    );

    loadTournamentTeams(tournamentId);
  };

  const handleRemoveTeam = async (
    tournamentId,
    teamId
  ) => {

    await removeTournamentTeam(
      tournamentId,
      teamId
    );

    loadTournamentTeams(tournamentId);
  };

  return (
    <Layout>

      <h1>Tournaments</h1>

      {/* CREATE TOURNAMENT */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >

        <input
          placeholder="Tournament Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Season"
          value={form.season}
          onChange={(e) =>
            setForm({
              ...form,
              season: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: e.target.value,
            })
          }
        />

        <button type="submit">
          Create
        </button>

      </form>

      {/* TOURNAMENT LIST */}

      {tournaments.map((tournament) => (

        <div
          key={tournament.id}
          style={{
            background: "white",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >

          <h2>
            {tournament.name}
          </h2>

          <p>
            Season:
            {" "}
            {tournament.season}
          </p>

          {/* ADD TEAM */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >

            <select
              onChange={(e) =>
                setSelectedTeams({
                  ...selectedTeams,
                  [tournament.id]:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Team
              </option>

              {teams.map((team) => (

                <option
                  key={team.id}
                  value={team.id}
                >
                  {team.name}
                </option>

              ))}

            </select>

            <button
              onClick={() =>
                handleAddTeam(
                  tournament.id
                )
              }
            >
              Add Team
            </button>

            <button
              onClick={() =>
                handleDelete(
                  tournament.id
                )
              }
            >
              Delete Tournament
            </button>

          </div>

          {/* TEAMS */}

          <div
            style={{
              marginTop: "15px",
            }}
          >

            <h4>Teams</h4>

            {tournamentTeams[
              tournament.id
            ]?.map((team) => (

              <div
                key={team.teamId}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "5px",
                }}
              >

                <span>
                  {team.teamName}
                </span>

                <button
                  onClick={() =>
                    handleRemoveTeam(
                      tournament.id,
                      team.teamId
                    )
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        </div>

      ))}

    </Layout>
  );
};

export default Tournaments;