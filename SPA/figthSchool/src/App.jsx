import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const [newUser, setNewUser] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    belt: 0,
  });

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/User/search`);
    setUsers(res.data);
  };

  const createUser = async () => {
    await axios.post(`${API_BASE}/User/create`, newUser);
    setNewUser({ name: "", nickname: "", phoneNumber: "", belt: 0 });
    await fetchUsers();
  };

  const getUserNameById = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? `${user.name} (${user.nickname})` : id;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 grid gap-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-300 text-center">
        QUINTA FIRE!
      </h1>
      {logged ? (
        <FightPage
          users={users}
          //createMatch={createMatch}
          FightStatusMap={FightStatusMap}
        />
      ) : (
        <div>
          <NewProfile createUser={createUser} />
          <h2>Ja possui um perfil? Faça login abaixo:</h2>
          <LoginPage setLogged={setLogged} />
        </div>
      )}
    </div>
  );
}
