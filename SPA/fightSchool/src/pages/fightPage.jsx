import React, { useState, useEffect } from "react";
import MatchRepository from "../repositories/MatchRepository";
import FightList from "../Components/FightList";
import { Select, SelectItem } from "../Components/ui/select";
import { FightStatusMap } from "../utils/FightStatusMap";
import { Button } from "../components/ui/Button";
import { HelperText } from "flowbite-react";
import { Input } from "../Components/ui/input";

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

function FightPage() {
  const [matches, setMatches] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [fightStatus, setFightStatus] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [errorMonth, setErrorMonth] = useState("");
  // const [errorStatus, setErrorStatus] = useState("");

  const fetchMatches = async (year, month) => {
    console.log({ year, month });
    setErrorYear("");
    setErrorMonth("");
    // setErrorStatus("");

    if (!year) {
      setErrorYear("Selecione o ano.");
    }
    if (!month) {
      setErrorMonth("Selecione o mês.");
    }

    let minDate, maxDate;
    minDate = new Date(Number(year), Number(month) - 1, 1);
    maxDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    const res = await MatchRepository.getAllMatches({
      fightStatus,
      minDate: minDate ? minDate.toISOString() : undefined,
      maxDate: maxDate ? maxDate.toISOString() : undefined,
    });
    setMatches(res);
  };

  useEffect(() => {
    const now = new Date();
    fetchMatches(now.getFullYear(), now.getMonth() + 1);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-[95%] md:w-2/3">
      <h4 className=" text-2xl md:text-5xl font-bebas-neue text-center  m-4">
        Buscador de lutas
      </h4>
      <div className="flex gap-2 mb-4 text-preto">
        <div className="flex flex-col  w-full">
          <Input
            placeholder="Ano"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            required
          />
          {errorYear && (
            <span className="text-red-500 text-xs mt-1">{errorYear}</span>
          )}
        </div>
        <div className="flex flex-col  w-full">
          <Select
            onChange={(e) => setMonthFilter(e)}
            value={monthFilter}
            required
          >
            <SelectItem value="">Mês</SelectItem>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </Select>
          {errorMonth && (
            <span className="text-red-500 text-xs mt-1">{errorMonth}</span>
          )}
        </div>
        <div className="flex flex-col  w-full">
          <Select
            onChange={(e) => setFightStatus(e)}
            value={fightStatus}
            required
          >
            <SelectItem value="">Status</SelectItem>
            {Object.entries(FightStatusMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </Select>
          {/* {errorStatus && (
            <span className="text-red-500 text-xs mt-1">{errorStatus}</span>
          )} */}
        </div>
        <Button onClick={() => fetchMatches(yearFilter, monthFilter)}>
          Filtrar
        </Button>
      </div>
      {!matches.length && (
        <div className="text-red-500 mb-4 text-center">
          Nenhuma luta foi encontrada.
        </div>
      )}
      {<FightList matches={matches} />}
    </div>
  );
}
export default FightPage;
