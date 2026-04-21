import "./item_modal.css";
import React, { useState } from "react";

import Input from "../input/input";
import Select from "../select/select";
import Button from "../button/button";

import { categories, rooms } from "../../../data.json";

import { addItem } from "../../../api";

export default function ItemModal({ onClose, onAdded, group }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    category: "",
    room: "",
    id: "",
    groupId: group?._id,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saved = await addItem(formData, { group: group?._id });
      console.log("Item adicionado com sucesso:", saved);
      if (onAdded) onAdded(saved);
      // Se o item foi adicionado com quantidade 0, atualizar lista de compras
      if (formData.quantity === "0" || formData.quantity === 0) {
        window.dispatchEvent(new CustomEvent("itemAddedToShopCart"));
      }
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      console.log(formData);
      alert(
        "Erro no servidor ao adicionar item. Veja o console para detalhes.",
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  return (
    <div className="item-modal">
      <h2>Adicionar item</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          name="name"
          type="text"
          value={formData.name}
          placeholder="Nome do item"
          onChange={handleChange}
        />
        <Input
          label="Quantidade"
          name="quantity"
          type="number"
          value={formData.quantity}
          placeholder="Quantidade"
          onChange={handleChange}
        />
        <Select
          label="Unidade"
          name="unit"
          options={[
            { label: "Unidade", value: "unit" },
            { label: "Litros", value: "litros" },
            { label: "kg", value: "kg" },
          ]}
          value={formData.unit}
          onChange={handleChange}
        />
        <Select
          label="Categoria"
          name="category"
          options={categoryOptions}
          value={formData.category}
          onChange={handleChange}
        />
        <Select
          label="Local"
          name="room"
          options={roomOptions}
          value={formData.room}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <Button className="add-item-btn" label="Adicionar" type="submit" />
          <Button className="cancel-btn" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}
