import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  getTeams,
  createTeam,
  deleteTeam,
} from "../services/teamService";

const Teams = () => {

  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    name: "",
    shortName: "",
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {

    try {

      const data = await getTeams();

      setTeams(data);

    } catch (err) {

      console.error(err);
    }
  };

  const handleSubmit = async (e) => {

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

      alert("Failed to create team");
    }
  };

  const handleDelete = async (id) => {

    try {

      await deleteTeam(id);

      loadTeams();

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <Layout>

      <h1>Teams</h1>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >

        <input
          placeholder="Team Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Short Name"
          value={form.shortName}
          onChange={(e) =>
            setForm({
              ...form,
              shortName: e.target.value,
            })
          }
        />

        <button type="submit">
          Create
        </button>

      </form>

      {/* TABLE */}

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
            <th>Name</th>
            <th>Short Name</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {teams.map((team) => (

            <tr key={team.id}>

              <td>{team.id}</td>

              <td>{team.name}</td>

              <td>{team.shortName}</td>

              <td>

                <button
                  onClick={() =>
                    handleDelete(team.id)
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

export default Teams;