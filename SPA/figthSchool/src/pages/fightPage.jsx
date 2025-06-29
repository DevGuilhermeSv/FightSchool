import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "../Components/ui/select";
import ListFights from "../Components/listFights";
import NewFight from "../Components/newFight";
const API_BASE = "http://localhost:18157/api";

function FightPage({ users }) {
  const [newMatchIsOpen, setNewMatchIsOpen] = useState(false);
  // const [newMatch, setNewMatch] = useState({
  //   fighterOneId: "",
  //   fighterTwoId: "",
  //   date: "",
  //   status: 0,
  // });

  const [matches, setMatches] = useState([]);

  // const createMatch = async () => {
  //   await axios.post(`${API_BASE}/Match`, newMatch);
  //   await fetchMatches();
  // };

  const fetchMatches = async () => {
    const res = await axios.get(`${API_BASE}/Match/search`);
    setMatches(res.data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => setNewMatchIsOpen(true)}>Nova Luta</Button>

      <Button>Ver resultados anteriores</Button>
      {newMatchIsOpen ? (
        <NewFight />
      ) : (
        <div>
          <h2> Lutas Agendas para a QUINTA-FIRE!</h2>
          <ListFights
            matches={matches}
            // getUserNameById={getUserNameById}
            // FightStatusMap={FightStatusMap}
          />
        </div>
      )}
    </div>
  );
}
export default FightPage;
