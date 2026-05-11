import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getMatches,
} from "../services/matchService";

import {
  quickUpdateScore,
} from "../services/matchApprovalService";

const MatchScoreEntry = () => {

  const [matches, setMatches] =
    useState([]);

  const [scores, setScores] =
    useState({});

  const [currentPage, setCurrentPage] =
    useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {

    loadMatches();

  }, []);

  const loadMatches = async () => {

    try {

      const data =
        await getMatches();

      // ONLY UNSCORED MATCHES
      const filtered =
        data
          .filter(
            (match) =>
              match.homeScore ===
                null &&
              match.awayScore ===
                null
          )

          // NEWEST DATE FIRST
          .sort(
            (a, b) =>
              new Date(b.matchDate) -
              new Date(a.matchDate)
          );

      setMatches(filtered);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load matches"
      );
    }
  };

  const handleChange = (
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

  const handleSubmit =
    async (matchId) => {

      try {

        const score =
          scores[matchId];

        if (
          !score ||
          score.homeScore === "" ||
          score.awayScore === ""
        ) {

          alert(
            "Enter both scores"
          );

          return;
        }

        await quickUpdateScore(
          matchId,
          {
            homeScore: Number(
              score.homeScore
            ),

            awayScore: Number(
              score.awayScore
            ),
          }
        );

        alert(
          "Score updated successfully"
        );

        // REMOVE UPDATED MATCH
        setMatches((prev) =>
          prev.filter(
            (m) => m.id !== matchId
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Failed to update score"
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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
        }}
      >

        <h1
          style={{
            fontSize: "32px",
            marginBottom: "30px",
            color: "#222",
            fontWeight: "700",
          }}
        >
          Match Score Entry
        </h1>

        {paginatedMatches.length === 0 ? (

          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "16px",
              textAlign: "center",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >

            <h2>
              No pending matches
            </h2>

            <p>
              All scores are updated.
            </p>

          </div>

        ) : (

          paginatedMatches.map((match) => (

            <div
              key={match.id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "24px",
                marginBottom: "20px",
                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.08)",
                border:
                  "1px solid #f0f0f0",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >

                <div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "24px",
                    }}
                  >
                    {match.homeTeam}

                    <span
                      style={{
                        color: "#888",
                        margin: "0 10px",
                      }}
                    >
                      vs
                    </span>

                    {match.awayTeam}
                  </h2>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#666",
                    }}
                  >
                    {match.tournamentName}
                  </p>

                </div>

                <div
                  style={{
                    background: "#f5f5f5",
                    padding:
                      "8px 14px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#444",
                  }}
                >
                  {match.matchDate}
                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >

                <input
                  type="number"
                  placeholder={
                    match.homeTeam
                  }
                  value={
                    scores[match.id]
                      ?.homeScore ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      match.id,
                      "homeScore",
                      e.target.value
                    )
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border:
                      "1px solid #ddd",
                    fontSize: "16px",
                  }}
                />

                <input
                  type="number"
                  placeholder={
                    match.awayTeam
                  }
                  value={
                    scores[match.id]
                      ?.awayScore ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      match.id,
                      "awayScore",
                      e.target.value
                    )
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border:
                      "1px solid #ddd",
                    fontSize: "16px",
                  }}
                />

                <button
                  onClick={() =>
                    handleSubmit(
                      match.id
                    )
                  }
                  style={{
                    background:
                      "#111827",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Submit
                </button>

              </div>

            </div>
          ))
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "10px",
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
            >
              Previous
            </button>

            <span
              style={{
                padding: "8px 12px",
              }}
            >
              Page {currentPage} of {totalPages}
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
            >
              Next
            </button>

          </div>
        )}

      </div>

    </Layout>
  );
};

export default MatchScoreEntry;