import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTournaments } from "../services/tournamentService";

const Home = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(
  Array.isArray(data)
    ? data
    : data.content || []
);
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
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>
          Ajit Bipin Subarna E-Football Tournament
        </h1>

        <p style={{ fontSize: "18px", color: "gray" }}>
          Who will be the winner?????
        </p>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Admin Login
        </button>
      </div>

      {/* TOURNAMENTS TITLE */}
      <h2 style={{ marginBottom: "20px" }}>Tournaments</h2>

      {/* TOURNAMENT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            onClick={() =>
              navigate(`/public-standings/${tournament.id}`)
            }
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h2>{tournament.name}</h2>

            <p>Season: {tournament.season}</p>

            <p>
              {tournament.startDate} → {tournament.endDate}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents double navigation
                navigate(`/public-standings/${tournament.id}`);
              }}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                background: "black",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              View Standings
            </button>
            <button
  onClick={(e) => {

    e.stopPropagation();

    navigate(
      `/public-matches/${tournament.id}`
    );

  }}
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px 20px",
    border: "none",
    background: "#22c55e",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  View Matches
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;