import "./input.css";

export default function Input({ label, type, value, placeholder }) {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <div>
        <input type={type} value={value} placeholder={placeholder} />
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
