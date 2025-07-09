import BaseComponent from "./ui/BaseComponent";
import Fight from "./Fight";

function ListFights({ matches }) {
  return (
    <div className="grid gap-4">
      {matches.map((m) => (
        <Fight key={m.id} fight={m} />
      ))}
    </div>
  );
}

export default ListFights;
