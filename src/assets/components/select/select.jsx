import "./select.css";

export default function Select({ label, options, name, value, onChange }) {
  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => {
          const optionValue =
            typeof option === "object"
              ? (option.value ?? option.label ?? option)
              : option;
          const optionLabel =
            typeof option === "object"
              ? (option.label ?? option.value ?? option)
              : option;
          return (
            <option key={optionValue ?? index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}
