import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getTeams,
  createTeam,
  deleteTeam,
} from "../services/teamService";

const Teams = () => {

  const [teams, setTeams] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      shortName: "",
    });

  useEffect(() => {

    loadTeams();

  }, []);

  const loadTeams = async () => {

    try {

      const data =
        await getTeams();

      setTeams(data);

    } catch (err) {

      console.error(err);
    }
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createTeam(form);

        setForm({
          name: "",
          shortName: "",
        });

        loadTeams();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to create team"
        );
      }
    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete this team?"
        );

      if (!confirmed) return;

      try {

        await deleteTeam(id);

        setTeams((prev) =>
          prev.filter(
            (team) =>
              team.id !== id
          )
        );

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete team"
        );
      }
    };

  return (

    <Layout>

      <div
        style={{
          maxWidth: "1100px",
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
            Teams
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Manage football teams
          </p>

        </div>

        {/* CREATE TEAM */}

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
            Create Team
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
              placeholder="Team Name"
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
              placeholder="Short Name"
              value={form.shortName}
              onChange={(e) =>
                setForm({
                  ...form,
                  shortName:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Create Team
            </button>

          </form>

        </div>

        {/* TEAM LIST */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >

          {teams.map((team) => (

            <div
              key={team.id}
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
                    color: "#9ca3af",
                    marginBottom: "6px",
                    fontSize: "14px",
                  }}
                >
                  Team ID #{team.id}
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    color: "#111827",
                  }}
                >
                  {team.name}
                </h2>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#6b7280",
                    fontWeight: "600",
                  }}
                >
                  {team.shortName}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(team.id)
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

            </div>

          ))}

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

export default Teams;