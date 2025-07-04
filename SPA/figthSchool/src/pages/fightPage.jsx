import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MatchRepository from "../repositories/MatchRepository";
import ListFights from "../Components/listFights";
import NewFight from "../Components/newFight";

function FightPage() {
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
    const res = await MatchRepository.getAllMatches();
    setMatches(res);
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
          <h2>Confira as Lutas da Semana</h2>
          <ListFights matches={matches} />
        </div>
      )}
    </div>
  );
}
export default FightPage;
