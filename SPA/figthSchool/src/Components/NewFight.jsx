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
import axios from "axios";

const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

function NewFight() {
  const [newMatch, setNewMatch] = useState({});

  const [users, setUsers] = useState([]);

  const API_BASE = "http://localhost:18157/api";

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/User/search`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const createMatch = async () => {
    try {
      await axios.post(`${API_BASE}/Match`, newMatch);
      setNewMatch({});
      await fetchUsers();
    } catch (error) {
      console.error("Erro ao criar luta:", error);
    }
  };

  return (
    <BaseComponent>
      <h2 className="text-xl font-semibold">Criar nova luta</h2>

      <Select onChange={(v) => setNewMatch({ ...newMatch, fighterOneId: v })}>
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name} ({u.nickname})
          </SelectItem>
        ))}
      </Select>

      <Select onChange={(v) => setNewMatch({ ...newMatch, fighterTwoId: v })}>
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id}>
            {u.name} ({u.nickname})
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
