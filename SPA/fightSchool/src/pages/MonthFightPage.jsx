import React, { useState, useEffect } from "react";
import MatchRepository from "../repositories/MatchRepository";
import FightList from "../Components/FightList";

function MonthFightPage() {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let minDate, maxDate;
    minDate = new Date(Number(year), Number(month) - 1, 1);
    maxDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    const res = await MatchRepository.getAllMatches({
      fightStatus: "",
      minDate: minDate ? minDate.toISOString() : undefined,
      maxDate: maxDate ? maxDate.toISOString() : undefined,
    });
    setMatches(res);
  };

  useEffect(() => {
    fetchMatches();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-[95%] md:w-2/3">
      <h4 className=" text-2xl md:text-5xl font-bebas-neue text-center  m-4">
        Lutas do mês
      </h4>

      {!matches.length && (
        <div className="text-red-500 mb-4 text-center">
          Nenhuma luta foi encontrada.
        </div>
      )}
      {<FightList matches={matches} />}
    </div>
  );
}
export default MonthFightPage;
