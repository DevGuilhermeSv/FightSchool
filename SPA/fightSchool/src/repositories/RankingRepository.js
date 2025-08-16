import api from "./api";

const RankingRepository = {
  getAllUserRankings: async (belt) => {
    const response = await api.get(`/UserRankings?belt=${belt}`);
    return response.data;
  },
};

export default RankingRepository;
