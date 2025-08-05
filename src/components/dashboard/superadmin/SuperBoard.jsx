import TempleBarChart from "../shared/TempleBarChart";
import "../../../styles/Board.css";

export const SuperBoard = ({ title, id, tipo, width, data }) => {
  // Ordenar de mayor a menor por cantidad
  const sortedData = [...data].sort((a, b) => b.cantidad - a.cantidad);

  return (
    <section className="board-container" id={id}>
      <h1>{title}</h1>
      <TempleBarChart data={sortedData} tipo={tipo} width={width} />
    </section>
  );
};
