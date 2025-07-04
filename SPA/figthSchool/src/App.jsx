import React, { useEffect, useState } from "react";
import axios from "axios";
import NewProfile from "@/components/NewProfile";
import LoginPage from "./pages/login";
import FightPage from "./pages/fightPage";

const API_BASE = "http://localhost:18157/api";

const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

export default function App() {
  const [logged, setLogged] = useState(false);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/User/search`);
    setUsers(res.data);
  };

  const getUserNameById = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? `${user.name} (${user.userName})` : id;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen w-full p-4 flex flex-col items-center gap-6">
      <div className="flex md:flex-row flex-col items-center gap-2">
        <img
          src="/fightschool-logo1.png"
          alt="Fight School Logo"
          className="w-32 h-32 md:w-48 md:h-48"
        />
        <h1 className="text-6xl font-manufacturingConsent font-normal text-yellow-300 text-center">
          Fight School - Quinta Fire
        </h1>
        <img
          src="/fightschool-logo2.png"
          alt="Fight School Logo"
          className="w-32 h-32 md:w-48 md:h-48"
        />
      </div>

      {logged ? (
        <FightPage users={users} FightStatusMap={FightStatusMap} />
      ) : (
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 p-4 w-full">
          <NewProfile className="w-3/4" />
          <div>
            <h2>Já possui um perfil? Faça login abaixo:</h2>
            <LoginPage setLogged={setLogged} />
          </div>
        </div>
      )}
      {/* </div> */}
    </main>
  );
}
