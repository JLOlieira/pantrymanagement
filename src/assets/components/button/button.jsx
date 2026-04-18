import "./button.css";

export default function Button({ className, label, icon, onClick }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <i class={`fa-solid ${icon}`}></i>}
      {label && <span>{label}</span>}
    </button>
  );
}