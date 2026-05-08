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

  useEffect(() => {

    loadTournaments();

  }, []);

  const loadTournaments = async () => {

    const data = await getTournaments();

    setTournaments(data);
  };

  const handleTournamentChange = async (
    tournamentId
  ) => {

    setSelectedTournament(
      tournamentId
    );

    const data = await getStandings(
      tournamentId
    );

    setStandings(data);
  };

  return (
    <Layout>

      <h1>Standings</h1>

      {/* TOURNAMENT SELECT */}

      <div
        style={{
          marginTop: "20px",
        }}
      >

        <select
          value={selectedTournament}
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

      </div>

      {/* STANDINGS TABLE */}

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

            <th>#</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>

          </tr>

        </thead>

        <tbody>

          {standings.map(
            (team, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{team.team}</td>

              <td>{team.played}</td>

              <td>{team.wins}</td>

              <td>{team.draws}</td>

              <td>{team.losses}</td>

              <td>{team.goalsFor}</td>

              <td>{team.goalsAgainst}</td>

              <td>{team.goalDifference}</td>

              <td>{team.points}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </Layout>
  );
};

export default Standings;