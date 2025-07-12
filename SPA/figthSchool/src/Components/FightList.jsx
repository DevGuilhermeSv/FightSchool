import BaseComponent from "./ui/BaseComponent";
import Fight from "./Fight";

function FightList({ matches }) {
  return (
    <>
      {matches.map((m) => (
        <Fight key={m.id} fight={m} className="mb-4" />
      ))}
    </>
  );
}

export default FightList;
