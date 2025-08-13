export const DatalistEditPerson = ({
  name,
  label,
  list,
  value,
  event,
  array,
}) => {
  return (
    <section className="datos">
      <label>{label}</label>
      <input
        name={name}
        type="datalist"
        list={list}
        value={value}
        onChange={event}
      />
      <datalist id={list}>
        {array !== "OTROS" && Array.isArray(array) ? (
          array.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))
        ) : (
          <option value="OTROS">OTROS</option>
        )}
      </datalist>
    </section>
  );
};
