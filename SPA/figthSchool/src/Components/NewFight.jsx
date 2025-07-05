import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "./ui/select";
import ListFights from "./listFights";
import BaseComponent from "./ui/BaseComponent";
import UserRepository from "../repositories/UserRepository";
import MatchRepository from "../repositories/MatchRepository";

const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

function NewFight({ setNewMatchIsOpen }) {
  const [newMatch, setNewMatch] = useState({});

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await UserRepository.getAllUsers();
    setUsers(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createMatch = async () => {
    try {
      console.log(newMatch);
      await MatchRepository.createMatch(newMatch);
      alert("Luta criada com sucesso!");
      setNewMatchIsOpen(false);
      setNewMatch({});
      await fetchUsers();
    } catch (error) {
      console.error("Erro ao criar luta:", error);
      alert("Erro ao criar luta:" + error.message);
    }
  };

  return (
    <BaseComponent>
      <h2 className="text-xl font-semibold">Criar nova luta</h2>

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

      <Select onChange={(v) => setNewMatch({ ...newMatch, location: v })}>
        {Object.entries(FightStatusMap).map(([val, label]) => (
          <SelectItem key={val} value={val}>
            {label}
          </SelectItem>
        ))}
      </Select>

      <Button onClick={createMatch}>Criar Luta</Button>
    </BaseComponent>
  );
}
export default NewFight;
