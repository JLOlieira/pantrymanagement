import "./select.css";

export default function Select({ label, options, name, value, onChange }) {
  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
