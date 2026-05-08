import { useEffect, useState } from "react";

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

  const [matches, setMatches] = useState([]);

  const [tournaments, setTournaments] =
    useState([]);

  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    tournamentId: "",
    homeTeamId: "",
    awayTeamId: "",
    homeScore: 0,
    awayScore: 0,
    matchDate: "",
  });

  useEffect(() => {

    loadMatches();

    loadTournaments();

  }, []);

  const loadMatches = async () => {

    const data = await getMatches();

    setMatches(data);
  };

  const loadTournaments = async () => {

    const data = await getTournaments();

    setTournaments(data);
  };

  const handleTournamentChange = async (
    tournamentId
  ) => {

    setForm({
      ...form,
      tournamentId,
    });

    const data =
      await getTournamentTeams(
        tournamentId
      );

    setTeams(data);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.homeTeamId ===
      form.awayTeamId
    ) {

      alert(
        "Home and Away team cannot be same"
      );

      return;
    }

    await createMatch(form);

    setForm({
      tournamentId: "",
      homeTeamId: "",
      awayTeamId: "",
      homeScore: 0,
      awayScore: 0,
      matchDate: "",
    });

    loadMatches();
  };

  const handleDelete = async (id) => {

    await deleteMatch(id);

    loadMatches();
  };

  return (
    <Layout>

      <h1>Matches</h1>

      {/* CREATE MATCH */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
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

        {/* SCORES */}

        <input
          type="number"
          placeholder="Home Score"
          value={form.homeScore}
          onChange={(e) =>
            setForm({
              ...form,
              homeScore:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Away Score"
          value={form.awayScore}
          onChange={(e) =>
            setForm({
              ...form,
              awayScore:
                e.target.value,
            })
          }
        />

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
        />

        <button type="submit">
          Create Match
        </button>

      </form>

      {/* MATCH TABLE */}

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "30px",
          background: "white",
        }}
      >

        <thead>

          <tr>

            <th>ID</th>
            <th>Tournament</th>
            <th>Home</th>
            <th>Away</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {matches.map((match) => (

            <tr key={match.id}>

              <td>{match.id}</td>

              <td>
                {match.tournamentName}
              </td>

              <td>{match.homeTeam}</td>

              <td>{match.awayTeam}</td>

              <td>
                {match.homeScore}
                {" - "}
                {match.awayScore}
              </td>

              <td>
                {match.matchDate}
              </td>

              <td>

                <button
                  onClick={() =>
                    handleDelete(match.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Layout>
  );
};

export default Matches;