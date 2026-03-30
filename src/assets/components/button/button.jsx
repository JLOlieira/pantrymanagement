import "./button.css";

export default function Button({className, label, onClick }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}