export const CuidadoresFilter = ({
  id,
  title,
  value,
  list,
  handle,
  array,
  disabled,
}) => {
  return (
    <div id={id}>
      <label>{title}</label>
      <input
        type="datalist"
        list={list}
        value={value}
        onChange={handle}
        disabled={disabled}
      ></input>
      <datalist id={list}>
        <option value="">Seleccione</option>
        {array.map((element, i) => (
          <option key={i} value={element.usuario}>
            {element.nombre}
          </option>
        ))}
      </datalist>
    </div>
  );
};
