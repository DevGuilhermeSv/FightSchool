import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

// Adicione o caminho da imagem da coroa

export default function RankingList(props) {
  const { rankings } = props;

  if (!rankings || rankings.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Nenhum ranking encontrado.
      </div>
    );
  }
  return (
    <>
      {rankings.map((m, idx) => (
        <Card key={m.id} className="mb-4 flex items-center gap-2">
          <div className="font-bebas-neue text-2xl flex items-center gap-2">
            <span>{idx + 1}º</span>

            {m.user.userName}

            {idx === 0 && (
              <img
                src="crown.svg" // Substitua pelo caminho correto da imagem da coroa
                alt="Coroa"
                className="w-6 h-6"
              />
            )}
          </div>
        </Card>
      ))}
    </>
  );
}
