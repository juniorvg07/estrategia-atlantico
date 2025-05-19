import "../styles/Municipio.css";

export const Municipio = ({ nombre, lideres, referidos }) => {
  return (
    <div className="municipio-container">
      <h1>{nombre}</h1>
      <div className="data">
        <h2>
          Líderes: <span>{lideres}</span>
        </h2>
        <h2>
          Referidos: <span>{referidos}</span>
        </h2>
      </div>
    </div>
  );
};
