import { Belt } from "./NewProfile";
import BaseComponent from "./ui/BaseComponent";
import { Button, Card } from "flowbite-react";

const FightStatusMap = {
  0: "Agendado",
  1: "Em andamento",
  2: "Finalizado",
};

function Fight({ fight }) {
  return (
    <BaseComponent className="p-4">
      <div className="flex flex-col md:flex-row justify-around space-x-4 ">
        <div
          key={fight.id}
          className=" flex flex-row justify-around space-x-4 align-center items-center"
        >
          {/* <div className="shadow bg-white rounded-sm border p-4">
            <div>
              <strong>Data:</strong> {new Date(fight.date).toLocaleString()}
            </div>
            <div>
              <strong>Status:</strong> {FightStatusMap[fight.status]}
            </div>
          </div> */}
          <FighterDescription fighter={fight.fighterOne} />
          <div className="text-amarelo-100 text-5xl font-bebas-neue font-black">
            VS
          </div>
          <FighterDescription fighter={fight.fighterTwo} />
        </div>
        <CardInformation fight={fight} />
      </div>
    </BaseComponent>
  );
}

function FighterDescription({ fighter }) {
  return (
    <Card className="text-white space-y-2 min-w-50 ">
      <div className="font-bebas-neue text-2xl ">{fighter.userName}</div>
      <div>{Object.keys(Belt)[fighter.belt]}</div>
    </Card>
  );
}
function CardInformation({ fight }) {
  return (
    <Card className="max-w-sm font-bebas-neue">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {FightStatusMap[fight.status]}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {fight.date}
      </p>
      <Button>
        Atualizar Status
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}

export default Fight;
