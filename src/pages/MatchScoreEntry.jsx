import React, {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getMatches,
} from "../services/matchService";

import {
  submitScore,
} from "../services/matchApprovalService";

const MatchScoreEntry = () => {

  // TEMP USER ID
  const userId = 1;

  const [matches, setMatches] =
    useState([]);

  const [scores, setScores] =
    useState({});

  useEffect(() => {

    loadMatches();

  }, []);

  const loadMatches = async () => {

    try {

      const data =
        await getMatches();

      // ONLY SHOW UNSCORED MATCHES
      const filteredMatches =
        data.filter(
          (match) =>
            match.homeScore ===
              null &&
            match.awayScore ===
              null
        );

      setMatches(
        filteredMatches
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load matches"
      );
    }
  };

  const handleInputChange = (
    matchId,
    field,
    value
  ) => {

    setScores((prev) => ({
      ...prev,

      [matchId]: {
        ...prev[matchId],

        [field]: value,
      },
    }));
  };

  const handleSubmitScore =
    async (matchId) => {

      try {

        const scoreData =
          scores[matchId];

        if (
          !scoreData ||
          scoreData.homeScore ===
            "" ||
          scoreData.awayScore ===
            ""
        ) {

          alert(
            "Enter both scores"
          );

          return;
        }

        await submitScore(
          matchId,
          userId,
          {
            homeScore: Number(
              scoreData.homeScore
            ),

            awayScore: Number(
              scoreData.awayScore
            ),
          }
        );

        alert(
          "Score submitted for approval"
        );

        // RELOAD MATCHES
        loadMatches();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data ||
          "Failed to submit score"
        );
      }
    };

  return (

    <Layout>

      <h1>
        Match Score Entry
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          background: "white",
        }}
      >

        <thead>

          <tr>

            <th>ID</th>

            <th>
              Tournament
            </th>

            <th>
              Home Team
            </th>

            <th>
              Away Team
            </th>

            <th>Date</th>

            <th>
              Enter Score
            </th>

          </tr>

        </thead>

        <tbody>

          {matches.map(
            (match) => (

              <tr
                key={match.id}
              >

                <td>
                  {match.id}
                </td>

                <td>
                  {
                    match.tournamentName
                  }
                </td>

                <td>
                  {
                    match.homeTeam
                  }
                </td>

                <td>
                  {
                    match.awayTeam
                  }
                </td>

                <td>
                  {
                    match.matchDate
                  }
                </td>

                <td>

                  <div
                    style={{
                      display:
                        "flex",

                      gap: "5px",
                    }}
                  >

                    <input
                      type="number"
                      placeholder="Home"
                      value={
                        scores[
                          match.id
                        ]
                          ?.homeScore ||
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        handleInputChange(
                          match.id,
                          "homeScore",
                          e.target
                            .value
                        )
                      }
                      style={{
                        width:
                          "60px",
                      }}
                    />

                    <input
                      type="number"
                      placeholder="Away"
                      value={
                        scores[
                          match.id
                        ]
                          ?.awayScore ||
                        ""
                      }
                      onChange={(
                        e
                      ) =>
                        handleInputChange(
                          match.id,
                          "awayScore",
                          e.target
                            .value
                        )
                      }
                      style={{
                        width:
                          "60px",
                      }}
                    />

                    <button
                      onClick={() =>
                        handleSubmitScore(
                          match.id
                        )
                      }
                    >
                      Submit
                    </button>

                  </div>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </Layout>
  );
};

export default MatchScoreEntry;