import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { MetasAtl } from "../../utils/metas";

const COLORS = ["var(--azul-fuerte)", "#d31919"];

export const PieChartAdmin = ({ nombre, rol, cantidad }) => {
  const metas = MetasAtl.find((foro) => foro.foro === nombre);

  var metaRol = 0;
  if (rol === "Líderes") {
    metaRol = metas.metaLideres;
  } else if (rol === "Referidos") {
    metaRol = metas.metaReferidos;
  }

  const valor = metaRol - cantidad;

  const data = [
    { name: rol, value: cantidad },
    { name: "Restantes", value: valor },
  ];
  return (
    <div className="grafico" style={{ width: "100%", height: "100%" }}>
      <PieChart width={550} height={380}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
