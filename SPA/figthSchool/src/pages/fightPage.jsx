import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MatchRepository from "../repositories/MatchRepository";
import FightList from "../Components/FightList";
import NewFight from "./NewFight";
import { Select, SelectItem } from "../Components/ui/select";
import { FightStatusMap } from "../utils/FightStatusMap";

const months = [
  { value: "", label: "Todos" },
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

function getYears(matches) {
  const years = matches
    .map((m) => new Date(m.date).getFullYear())
    .filter((y, i, arr) => arr.indexOf(y) === i);
  years.sort((a, b) => b - a);
  return ["", ...years];
}

function FightPage() {
  const [matches, setMatches] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [fightStatus, setFightStatus] = useState(""); // Adicione se quiser filtrar por status

  const fetchMatches = async () => {
    let minDate, maxDate;
    if (monthFilter && yearFilter) {
      minDate = new Date(Number(yearFilter), Number(monthFilter) - 1, 1);
      maxDate = new Date(
        Number(yearFilter),
        Number(monthFilter),
        0,
        23,
        59,
        59,
        999
      );
    } else if (yearFilter) {
      minDate = new Date(Number(yearFilter), 0, 1);
      maxDate = new Date(Number(yearFilter), 11, 31, 23, 59, 59, 999);
    }
    const res = await MatchRepository.getAllMatches({
      fightStatus,
      minDate: minDate ? minDate.toISOString() : undefined,
      maxDate: maxDate ? maxDate.toISOString() : undefined,
    });
    setMatches(res);
  };

  useEffect(() => {
    fetchMatches();
    // eslint-disable-next-line
  }, [monthFilter, yearFilter, fightStatus]);

  const years = getYears(matches);

  return (
    <div className="w-[95%] md:w-2/3">
      <h4 className=" text-2xl md:text-5xl font-bebas-neue text-center  m-4">
        Confira as Lutas do mês
      </h4>
      <div className="flex gap-2 mb-4 text-preto">
        <Select
          onChange={(e) => {
            console.log(e);
            setMonthFilter(e);
          }}
          value={monthFilter}
        >
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
        <Select onChange={(e) => setYearFilter(e)} value={yearFilter}>
          <SelectItem value="">Todos</SelectItem>
          {years.slice(1).map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </Select>
        {/* Exemplo de filtro de status */}
        {
          <Select onChange={(e) => setFightStatus(e)} value={fightStatus}>
            {Object.entries(FightStatusMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
            <SelectItem value="">Todos Status</SelectItem>
          </Select>
        }
      </div>
      <FightList matches={matches} />
    </div>
  );
}
export default FightPage;
