export const InputField = ({
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  children,
}) => (
  <section className="credentials">
    <span className="material-symbols-outlined">{icon}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
    <label>{label}</label>
    {children}
  </section>
);
