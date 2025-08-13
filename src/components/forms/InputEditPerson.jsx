export const InputEditPerson = ({ type, name, label, value, event }) => {
  return (
    <section className="datos">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={event}
        required
      ></input>
    </section>
  );
};
