import "./product_edit_modal.css";
import React, { useState } from "react";
import { createPortal } from "react-dom";

import { updateItem } from "../../../api";

export default function ProductEditModal({ onClose, product, onUpdated }) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name || "",
    quantity: product.quantity || "",
    unit: product.unit || "",
    category: product.category || "",
    room: product.room || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateItem(formData);
      console.log("Item atualizado com sucesso:", updated);
      if (onUpdated) onUpdated(updated);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      console.log(formData);
      alert(
        "Erro no servidor ao atualizar item. Veja o console para detalhes.",
      );
    }
  };

  return createPortal(
    <div className="product-edit-modal-overlay" onClick={onClose}>
      <div className="product-edit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Editar item</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="quantity">Quantidade:</label>
          <div className="quantity-input">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: String(Math.max(0, Number(prev.quantity || 0) - 1)),
                }))
              }
            >
              -
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: String(Number(prev.quantity || 0) + 1),
                }))
              }
            >
              +
            </button>
          </div>
          <label htmlFor="unit">Unidade:</label>
          <select
            name="unit"
            id="unit"
            value={formData.unit}
            required
            onChange={handleChange}
          >
            <option value="">Selecione unidade</option>
            <option value="unidades">Unidades</option>
            <option value="litros">Litros</option>
            <option value="quilogramas">Quilogramas</option>
          </select>
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Selecione categoria</option>
            <option value="Laticínios">Laticínios</option>
            <option value="Padaria">Padaria</option>
            <option value="Hortifruti">Hortifruti</option>
            <option value="Carnes">Carnes</option>
            <option value="Despensa">Despensa</option>
          </select>
          <label htmlFor="room">Local:</label>
          <select
            name="room"
            id="room"
            value={formData.room}
            onChange={handleChange}
          >
            <option value="">Selecione local</option>
            <option value="Geladeira">Geladeira</option>
            <option value="Freezer">Freezer</option>
            <option value="Despensa">Despensa</option>
          </select>
          <button type="submit">Salvar alterações</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>,
    document.querySelector(".App"),
  );
}
