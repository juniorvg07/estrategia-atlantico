import "../../styles/LiderCard.css";

export const CuidadorCard = ({ data, setUser }) => {
  return (
    <article className="liderCard-container" onClick={() => setUser(data)}>
      <fieldset className="liderCard">
        <div className="lider-data">
          <div className="user-photo">
            <span className="material-symbols-outlined">person</span>
          </div>
          <label>{data.nombre}</label>
        </div>
      </fieldset>
    </article>
  );
};
