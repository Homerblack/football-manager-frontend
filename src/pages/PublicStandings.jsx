import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getStandings,
} from "../services/matchService";

const PublicStandings = () => {

  const { tournamentId } =
    useParams();

  const [standings, setStandings] =
    useState([]);

  useEffect(() => {

    loadStandings();

  }, []);

  const loadStandings = async () => {

    try {

      const data =
        await getStandings(
          tournamentId
        );

      setStandings(data);

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div
      style={{
        padding: "40px",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >

      <h1>
        🏆 Tournament Standings
      </h1>

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
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>PTS</th>

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

    </div>
  );
};

export default PublicStandings;