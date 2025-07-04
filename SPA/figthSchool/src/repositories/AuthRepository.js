import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;

const AuthRepository = {
  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/Auth/login`, { email, password });
    return res.data;
  },
  // Add more auth-related methods here as needed
};

export default AuthRepository;
