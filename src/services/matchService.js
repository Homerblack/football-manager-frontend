import api from "../api/axios";

export const getMatches = async () => {

  const res = await api.get("/matches");

  return res.data;
};

export const createMatch = async (data) => {

  const res = await api.post(
    "/matches",
    data
  );

  return res.data;
};

export const deleteMatch = async (id) => {

  await api.delete(`/matches/${id}`);
};

export const getStandings = async (
  tournamentId
) => {

  const res = await api.get(
    `/matches/tournament/${tournamentId}/standings`
  );

  return res.data;
};