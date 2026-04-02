import "./input.css";

export default function Input({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
}) {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <div>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "number" && (
          <div className="quantity-controls">
            <button type="button">-</button>
            <button type="button">+</button>
          </div>
        )}
      </div>
    </div>
  );
}
