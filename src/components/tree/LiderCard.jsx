import "../../styles/LiderCard.css";

export const LiderCard = ({ data, setNodo, setLider }) => {
  const handleOnClick = () => {
    setNodo(data.children);
    setLider(data.name);
  };

  return (
    <article className="liderCard-container">
      <fieldset className="liderCard" onClick={handleOnClick}>
        <div className="lider-data">
          <div className="user-photo">
            <span className="material-symbols-outlined">person</span>
          </div>
          <label>{data.name}</label>
        </div>

        <div className="lider-children">
          <label>
            Referidos:<span>{data.children.length}</span>
          </label>
        </div>
      </fieldset>
    </article>
  );
};
