import api from "./api";

export const submitScore =
  async (
    matchId,
    userId,
    data
  ) => {

    const response =
      await api.post(
        `/match-approvals/${matchId}/submit?userId=${userId}`,
        data
      );

    return response.data;
  };

export const approveScore =
  async (
    matchId,
    userId
  ) => {

    const response =
      await api.post(
        `/match-approvals/${matchId}/approve?userId=${userId}`
      );

    return response.data;
  };

export const rejectScore =
  async (
    matchId,
    userId,
    reason
  ) => {

    const response =
      await api.post(
        `/match-approvals/${matchId}/reject?userId=${userId}`,
        {
          reason,
        }
      );

    return response.data;
  };

export const getPendingApprovals =
  async () => {

    const response =
      await api.get(
        "/match-approvals/pending"
      );

    return response.data;
  };

  export const quickUpdateScore = async (
  matchId,
  data
) => {

  const response = await api.post(
    `/match-approvals/${matchId}/quick-update`,
    data
  );

  return response.data;
};