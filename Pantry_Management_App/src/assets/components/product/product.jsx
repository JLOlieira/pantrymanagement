import React from "react";
import { useState } from "react";
import "./product.css";
import ProductEditModal from "./product_edit_modal";

export default function Product({ name, quantity, unit, category, room }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const deleteItem = () => {
    const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const updatedItems = pantryItems.filter(
      (item) =>
        !(
          item.nome === name &&
          item.quantidade === quantity &&
          item.unidade === unit
        ),
    );
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    // Força o componente a re-renderizar
    setShowOptions(false);
    window.location.reload();
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  return (
    <div className="product">
      <div className="product_info">
        <div>
          <h3 className="name-txt">{name}</h3>
        </div>
        <div>
          <p className="category-txt">{category}</p>
          <p>
            Quantidade: {quantity} {unit}
          </p>
        </div>
      </div>

      {quantity === "0" && (
        <div>
          <button>excluir da lista</button>
        </div>
      )}

      <div className="options_menu">
        <button className="edit-btn" onClick={handleEdit}>
          <i class="fa-solid fa-pen"></i>
        </button>
        <button className="delete-btn" onClick={deleteItem}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      {showEditModal && (
        <ProductEditModal
          onClose={() => setShowEditModal(false)}
          product={{ name, quantity, unit, category, room }}
        />
      )}
    </div>
  );
}
