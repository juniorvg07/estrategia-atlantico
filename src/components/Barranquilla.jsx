import "../styles/Barranquilla.css";
import { BarranquillaData } from "../utils/barranquillaData";

export const Barranquilla = ({ lideres, referidos }) => {
  return (
    <div className="barranquilla-container">
      <h1>BARRANQUILLA</h1>
      <div className="bq-data">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="align-center">Líderes</th>
              <th className="align-center">Referidos</th>
            </tr>
          </thead>
          <tbody>
            {BarranquillaData.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td className="align-center">{lideres[index]}</td>
                <td className="align-center">{referidos[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
