import { format } from "date-fns";

function ListFights({ matches }) {
  return (
    <div className="grid gap-4">
      {matches.map((m) => (
        <div key={m.id} className="shadow bg-white rounded border">
          <div className="p-4">
            <div>
              <strong>Fighter 1:</strong> {m.fighterOneName}
            </div>
            <div>
              <strong>Fighter 2:</strong> {m.fighterTwoName}
            </div>
            <div>
              <strong>Data:</strong>{" "}
              {format(new Date(m.date), "dd/MM/yyyy HH:mm")}
            </div>
            <div>
              <strong>Status:</strong> {m.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListFights;
