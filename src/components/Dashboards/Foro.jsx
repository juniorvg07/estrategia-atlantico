import { MetasAtl } from "../../utils/metas";
import "../../styles/Foro.css";

export const Foro = ({ nombre, lideres, referidos }) => {
  const metas = MetasAtl.find((foro) => foro.foro === nombre);
  return (
    <>
      <article className="metas-article">
        <h2>Meta</h2>
        <h3>Líderes: {metas.metaLideres}</h3>
        <h3>Referidos: {metas.metaReferidos}</h3>
      </article>
      <article className="foro-article">
        <h2>{lideres}</h2>
        <span>Líderes</span>
      </article>
      <article className="foro-article">
        <h2>{referidos}</h2>
        <span>Referidos</span>
      </article>
    </>
  );
};
