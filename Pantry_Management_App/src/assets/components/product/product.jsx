import React from "react";
import { useState } from "react";
import "./product.css";
import ProductEditModal from "./product_edit_modal";

export default function Product({ name, quantity, unit, category, room }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const deleteItem = () => {
    const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const updatedItems = pantryItems.filter(
      (item) =>
        !(
          item.name === name &&
          item.quantity === quantity &&
          item.unit === unit
        ),
    );
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    // Força o componente a re-renderizar
    setShowOptions(false);
    window.location.reload();
  };

  // fecha o menu de opções ao clicar fora
  const handleClickOutside = (e) => {
    if (!e.target.closest(".options_btn")) {
      setShowOptions(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <div className="product">
      <div className="product_info">
        <div>
          <h3>{name}</h3>
          <p>
            {quantity} {unit}
          </p>
        </div>
        <div>
          <p>{category}</p>
          <p>{room}</p>
        </div>
      </div>
      <button
        className="options_btn"
        onClick={() => setShowOptions(!showOptions)}
      >
        Opções
      </button>
      {showOptions && (
        <div className="options_menu">
          <button onClick={handleEdit}>Editar</button>
          <button onClick={deleteItem}>Excluir</button>
        </div>
      )}
      {showEditModal && (
        <ProductEditModal
          onClose={() => setShowEditModal(false)}
          product={{ name, quantity, unit, category, room }}
        />
      )}
    </div>
  );
}
