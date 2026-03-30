import "./select.css";

export default function Select({ label, options, value}) {
  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      <select value={value} >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}