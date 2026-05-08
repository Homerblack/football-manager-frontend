import api from "../api/axios";

export const getTeams = async () => {
  const res = await api.get("/teams");
  return res.data;
};

export const createTeam = async (data) => {
  const res = await api.post("/teams", data);
  return res.data;
};

export const deleteTeam = async (id) => {
  await api.delete(`/teams/${id}`);
};