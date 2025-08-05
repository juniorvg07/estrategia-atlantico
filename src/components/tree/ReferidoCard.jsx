import "../../styles/LiderCard.css";

export const ReferidoCard = ({ data }) => {
  return (
    <article className="liderCard-container">
      <fieldset className="liderCard">
        <div className="lider-data">
          <div className="user-photo">
            <span className="material-symbols-outlined">person</span>
          </div>
          <label>{data.name}</label>
        </div>
        <label>Referido</label>
      </fieldset>
    </article>
  );
};
