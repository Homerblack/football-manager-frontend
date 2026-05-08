import api from "../api/axios";

export const getTournaments = async () => {

  const res = await api.get("/tournaments");

  return res.data;
};

export const createTournament = async (data) => {

  const res = await api.post(
    "/tournaments",
    data
  );

  return res.data;
};

export const deleteTournament = async (id) => {

  await api.delete(`/tournaments/${id}`);
};

export const addTeamToTournament = async (
  tournamentId,
  teamId
) => {

  await api.post(
    `/tournaments/${tournamentId}/teams/${teamId}`
  );
};

export const getTournamentTeams = async (
  tournamentId
) => {

  const res = await api.get(
    `/tournaments/${tournamentId}/teams`
  );

  return res.data;
};

export const removeTournamentTeam = async (
  tournamentId,
  teamId
) => {

  await api.delete(
    `/tournaments/${tournamentId}/teams/${teamId}`
  );
};