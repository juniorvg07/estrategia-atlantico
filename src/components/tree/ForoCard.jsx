import { cantidadPersonal } from "../../hooks/CantidadPersonal";
import { Spinner } from "../loaders/Spinner";
import "../../styles/ForoCard.css";

export const ForoCard = ({ foro, setForo }) => {
  const { cantidadesLideres, cantidadesReferidos, stateCantidades } =
    cantidadPersonal();
  const lideres = cantidadesLideres.filter((item) => item.foro === foro);
  const referidos = cantidadesReferidos.filter((item) => item.foro === foro);

  if (!stateCantidades) {
    return <Spinner />;
  }
  return (
    <article className="foroCard-container" onClick={() => setForo(foro)}>
      <fieldset className="foroCard">
        <h3>{foro}</h3>
        <div>
          <label>
            Lideres:<span>{lideres[0].cantidad}</span>
          </label>
          <label>
            Referidos:<span>{referidos[0].cantidad}</span>
          </label>
        </div>
      </fieldset>
    </article>
  );
};
