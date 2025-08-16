import api from "./api";

const MatchRepository = {
  getAllMatches: async ({ fightStatus, minDate, maxDate } = {}) => {
    const params = {};
    if (fightStatus !== undefined && fightStatus !== "")
      params.fightStatus = fightStatus;
    if (minDate) params._minDate = minDate;
    if (maxDate) params._maxDate = maxDate;
    const response = await api.get("/Match", { params });
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
  updateMatch: async (matchData) => {
    const response = await api.put(`/Match/`, matchData);
    return response.data;
  },
  deleteMatch: async (id) => {
    const response = await api.delete(`/Match/${id}`);
    return response.data;
  },
};

export default MatchRepository;
export { MatchRepository };
