import api from "./api";

const UserRepository = {
  getAllUsers: async () => {
    const response = await api.get("/User/search");
    return response.data;
  },
  getUserById: async (id) => {
    const response = await api.get(`/User/${id}`);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post("/User", userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/User/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/User/${id}`);
    return response.data;
  },
};

export default UserRepository;
export { UserRepository };
