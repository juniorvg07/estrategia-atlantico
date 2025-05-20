import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MetasAtl } from "../../utils/metas";

export const VerticalBarChart = ({ lideres, referidos }) => {
  const data = MetasAtl.map((foro, index) => {
    const lideresForo = lideres[index];
    const referidosForo = referidos[index];
    return {
      ...foro,
      lideres: lideresForo,
      referidos: referidosForo,
    };
  });

  const CustomTick = ({ x, y, payload }) => {
    const parts = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={5} dy={16} textAnchor="middle" fill="#333" fontSize={12}>
          {parts.map((line, index) => (
            <tspan x={0} dy={index === 0 ? 0 : 14} key={index}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="foro" tick={<CustomTick />} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="lideres"
            fill="var(--azul-mira)"
            name="Líderes"
            label={({ x, y, value, index }) => {
              const objetivo = data[index]?.metaLideres || 1; // evita dividir por 0
              const porcentaje = ((value / objetivo) * 100).toFixed(0);

              return (
                <text
                  x={x + 15}
                  y={y - 5}
                  fill={
                    porcentaje < 50
                      ? "red"
                      : porcentaje < 80
                      ? "orange"
                      : "green"
                  }
                  fontSize={12}
                  textAnchor="middle"
                >
                  {porcentaje}%
                </text>
              );
            }}
          />
          <Bar
            dataKey="referidos"
            fill="#19a42c"
            name="Referidos"
            label={({ x, y, value, index }) => {
              const objetivo = data[index]?.metaReferidos || 1; // evita dividir por 0
              const porcentaje = ((value / objetivo) * 100).toFixed(0);

              return (
                <text
                  x={x + 28}
                  y={y - 5}
                  fill={
                    porcentaje < 50
                      ? "red"
                      : porcentaje < 80
                      ? "orange"
                      : "green"
                  }
                  fontSize={14}
                  textAnchor="middle"
                >
                  {porcentaje}%
                </text>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
