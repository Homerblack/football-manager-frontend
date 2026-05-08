import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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

      setTournaments(data);

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px",
      }}
    >

      {/* HERO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >

        <h1
          style={{
            fontSize: "50px",
            marginBottom: "10px",
          }}
        >
           Ajit Bipin Subarna E-Football Tournament 
          </h1>

        <p
          style={{
            fontSize: "20px",
            color: "gray",
          }}
        >
          Manage tournaments, teams,
          matches and live standings.
        </p>

      </div>

      {/* TOURNAMENTS */}

      <h2>
      Tournaments
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >

        {tournaments.map((tournament) => (

          <div
            key={tournament.id}

            onClick={() =>
              navigate(
                `/public-standings/${tournament.id}`
              )
            }

            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.2s",
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

            <p>
              {tournament.startDate}
              {" → "}
              {tournament.endDate}
            </p>

            <button
              style={{
                marginTop: "10px",
                padding:
                  "10px 20px",
                border: "none",
                background: "black",
                color: "white",
                borderRadius: "8px",
              }}
            >
              View Standings
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Home;