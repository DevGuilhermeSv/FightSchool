import BaseComponent from "./ui/BaseComponent";

function Fight({ fight }) {
  const FightStatusMap = {
    0: "Agendado",
    1: "Em andamento",
    2: "Finalizado",
  };

  return (
    <BaseComponent className="p-4">
      <div className="grid gap-4">
        <div key={fight.id} className="shadow bg-white rounded border">
          <div className="p-4">
            <div>
              <strong>Fighter 1:</strong> {fight.fighterOne.userName}
            </div>
            <div>
              <strong>Fighter 2:</strong> {fight.fighterTwo.userName}
            </div>
            <div>
              <strong>Data:</strong> {new Date(fight.date).toLocaleString()}
            </div>
            <div>
              <strong>Status:</strong> {FightStatusMap[fight.status]}
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Fight;
