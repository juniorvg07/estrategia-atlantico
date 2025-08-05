import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const TempleBarChart = ({ data, tipo, width }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No hay datos para mostrar.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 20, left: 5, bottom: 0 }}
      >
        <XAxis type="number" axisLine={false} tickLine={false} tick={false} />
        <YAxis dataKey={tipo} type="category" width={width} />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#d32f2f">
          <LabelList dataKey="cantidad" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TempleBarChart;
