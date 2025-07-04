import api from "./api";

const MatchRepository = {
  getAllMatches: async () => {
    const response = await api.get("/Match");
    return response.data;
  },
  getMatchById: async (id) => {
    const response = await api.get(`/Match/${id}`);
    return response.data;
  },
  createMatch: async (matchData) => {
    const response = await api.post("/Match", matchData);
    return response.data;
  },
  updateMatch: async (id, matchData) => {
    const response = await api.put(`/Match/${id}`, matchData);
    return response.data;
  },
  deleteMatch: async (id) => {
    const response = await api.delete(`/Match/${id}`);
    return response.data;
  },
};

export default MatchRepository;
export { MatchRepository };
