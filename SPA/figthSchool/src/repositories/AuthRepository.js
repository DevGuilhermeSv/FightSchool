import api from "./api";

const AuthRepository = {
  login: async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    return res.data;
  },
  createUser: async (newUser) => {
    const res = await api.post("/Auth/register", newUser);
    return res.data;
  },
  // Add more auth-related methods here as needed
};

export default AuthRepository;
