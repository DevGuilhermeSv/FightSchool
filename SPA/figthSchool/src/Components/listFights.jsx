import BaseComponent from "./ui/BaseComponent";
import Fight from "./Fight";

function ListFights({ matches }) {
  return (
    <BaseComponent className="p-4">
      <div className="grid gap-4">
        {matches.map((m) => (
          <Fight key={m.id} fight={m} />
        ))}
      </div>
    </BaseComponent>
  );
}

export default ListFights;
