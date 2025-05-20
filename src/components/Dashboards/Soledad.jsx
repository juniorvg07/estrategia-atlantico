import "../../styles/Soledad.css";
import { SoledadData } from "../../utils/soledadData";

export const Soledad = ({ lideres, referidos }) => {
  return (
    <div className="soledad-container">
      <h1>SOLEDAD</h1>
      <div className="soledad-data">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="align-center">Líderes</th>
              <th className="align-center">Referidos</th>
            </tr>
          </thead>
          <tbody>
            {SoledadData.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td className="align-center">{lideres[index + 5]}</td>
                <td className="align-center">{referidos[index + 5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
