import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RankingRepository from "../repositories/RankingRepository"; // Altere para RankingRepository
import FightList from "../Components/FightList";
import NewFight from "./NewFight";
import { Select, SelectItem } from "../Components/ui/select";
import NavbarFs from "../Components/NavbarFs";
import { Belt } from "../Components/NewProfile";
import RankingList from "../Components/RankingList";

function RankingPage() {
  const [rankings, setRankings] = useState([]); // rankings ao invés de matches
  const [beltFilter, setBeltFilter] = useState(""); // filtro de faixa

  const fetchRankings = async () => {
    const res = await RankingRepository.getAllUserRankings(beltFilter);
    setRankings(res);
  };

  useEffect(() => {
    fetchRankings();
    // eslint-disable-next-line
  }, [beltFilter]);

  return (
    <div className="w-[95%] md:w-2/3">
      <h4 className=" text-2xl md:text-5xl font-bebas-neue text-center  m-4">
        Ranking dos Atletas
      </h4>
      <div className="flex gap-2 mb-4 text-preto">
        <Select
          onChange={(e) => {
            setBeltFilter(e);
          }}
          value={beltFilter}
        >
          <SelectItem>Geral</SelectItem>
          {Object.entries(Belt).map(([name, value]) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
}
export default RankingPage;
