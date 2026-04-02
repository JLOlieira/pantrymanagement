import React from "react";
import { useState } from "react";
import "./product.css";
import ProductEditModal from "./product_edit_modal";

import { deleteItem } from "../../../api";

export default function Product({ name, quantity, unit, category, room, id }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      const deleted = await deleteItem({ id });
      console.log("Item excluído com sucesso:", deleted);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      console.log(id);
      alert(
        "Erro no servidor ao excluir item. Veja o console para detalhes.",
      );
    }
    window.location.reload();
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
        <button className="delete-btn" onClick={handleDelete}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      {showEditModal && (
        <ProductEditModal
          onClose={() => setShowEditModal(false)}
          product={{ name, quantity, unit, category, room, id }}
        />
      )}
    </div>
  );
}
