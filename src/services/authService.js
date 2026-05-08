import api from "../api/axios";

export const login = async (data) => {
  const res = await api.post("/users/login", data);
  return res.data;
};