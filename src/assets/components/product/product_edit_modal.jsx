import "./product_edit_modal.css";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Input from "../input/input";
import Select from "../select/select";

import { categories, rooms } from "../../../data.json";
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

  const formatOption = (item) => {
    if (typeof item === "string") {
      return { label: item, value: item };
    }
    return {
      label: item.label ?? item.laber ?? item.value ?? "",
      value: item.value ?? item.label ?? item.laber ?? "",
    };
  };

  const categoryOptions = categories.map(formatOption);
  const roomOptions = rooms.map(formatOption);

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
          <Input
            label="Nome"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Quantidade"
            type="number"
            name="quantity"
            value={formData.quantity || ""}
            onChange={handleChange}
            required
          />
          <Select
            label="Unidade"
            options={["Unidade", "Litros", "kg"]}
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          ></Select>
          <Select
            label="Categoria"
            options={categoryOptions}
            name="category"
            value={formData.category}
            onChange={handleChange}
          ></Select>

          <Select
            label="Local"
            options={roomOptions}
            name="room"
            value={formData.room}
            onChange={handleChange}
          ></Select>
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
