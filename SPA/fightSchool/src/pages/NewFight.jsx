import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/Components/ui/input";
import { SelectItem } from "@/Components/ui/select";
import { Select } from "../Components/ui/select";
import BaseComponent from "../Components/ui/BaseComponent";
import UserRepository from "../repositories/UserRepository";
import MatchRepository from "../repositories/MatchRepository";
import { useNavigate } from "react-router-dom";
import { Label } from "flowbite-react";
const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

function NewFight({ logged }) {
  const navigate = useNavigate();

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
    <div className="w-[95%] md:w-2/3">
      <h4 className=" text-2xl md:text-5xl font-bebas-neue text-center  m-4">
        Nova Luta
      </h4>
      <BaseComponent>
        <Label htmlFor="fighterOneId">Lutador 1</Label>

        <Select
          id="fighterOneId"
          value={newMatch.fighterOneId || ""}
          onChange={(v) => setNewMatch({ ...newMatch, fighterOneId: v })}
        >
          {users.map((u) => (
            <SelectItem key={u.id} value={u.id}>
              {u.name} ({u.userName})
            </SelectItem>
          ))}
        </Select>

        <Label htmlFor="fighterTwoId">Lutador 2</Label>
        <Select
          id="fighterTwoId"
          value={newMatch.fighterTwoId || ""}
          onChange={(v) => setNewMatch({ ...newMatch, fighterTwoId: v })}
        >
          {users.map((u) => (
            <SelectItem key={u.id} value={u.id}>
              {u.name} ({u.userName})
            </SelectItem>
          ))}
        </Select>
        <Label htmlFor="date">Data</Label>

        <Input
          id="date"
          type="datetime-local"
          onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
        />

        <Button onClick={createMatch}>Agendar Luta</Button>
      </BaseComponent>
    </div>
  );
}
export default NewFight;
