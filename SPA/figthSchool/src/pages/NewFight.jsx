import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { Select } from "../Components/ui/select";
import BaseComponent from "../Components/ui/BaseComponent";
import UserRepository from "../repositories/UserRepository";
import MatchRepository from "../repositories/MatchRepository";
import { useNavigate } from "react-router-dom";

const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

function NewFight({ logged }) {
  const navigate = useNavigate();
  console.log("NewFight component rendered");

  console.log(logged);

  const [newMatch, setNewMatch] = useState({ status: 0 });

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await UserRepository.getAllUsers();
    res.sort((a, b) => a.name.localeCompare(b.name));
    setUsers(res);
  };

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const createMatch = async () => {
    try {
      console.log(newMatch);
      await MatchRepository.createMatch(newMatch);
      alert("Luta criada com sucesso!");
      setNewMatch({});
      navigate("/fightPage");
    } catch (error) {
      console.error("Erro ao criar luta:", error);
      alert("Erro ao criar luta:" + error.message);
    }
  };

  return (
    <BaseComponent className="w-2/3">
      <h2 className="text-2xl md:text-5xl font-bebas-neue text-center">
        Nova Luta
      </h2>

      <Select
        value={newMatch.fighterOneId || ""}
        onChange={(v) => setNewMatch({ ...newMatch, fighterOneId: v })}
      >
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name} ({u.userName})
          </SelectItem>
        ))}
      </Select>

      <Select
        value={newMatch.fighterTwoId || ""}
        onChange={(v) => setNewMatch({ ...newMatch, fighterTwoId: v })}
      >
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name} ({u.userName})
          </SelectItem>
        ))}
      </Select>

      <Input
        type="datetime-local"
        onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
      />

      <Button onClick={createMatch}>Agendar Luta</Button>
    </BaseComponent>
  );
}
export default NewFight;
