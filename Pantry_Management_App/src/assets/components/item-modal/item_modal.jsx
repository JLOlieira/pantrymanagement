import "./item_modal.css";
import React from "react";
import { useState } from "react";

export default function ItemModal({ onClose }) {

  // Se já existe o item, soma a quantidade ao invés de criar um novo item
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      nome: formData.get("name"),
      quantidade: formData.get("quantity"),
      unidade: formData.get("unit"),
      categoria: formData.get("category"),
      local: formData.get("room"),
    };
    const existingItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const existingItemIndex = existingItems.findIndex(
      (item) => item.nome === newItem.nome && item.local === newItem.local
    );
    if (existingItemIndex !== -1) {
      existingItems[existingItemIndex].quantidade = (
        parseInt(existingItems[existingItemIndex].quantidade) + parseInt(newItem.quantidade)
      ).toString();
      localStorage.setItem("pantryItems", JSON.stringify(existingItems));
    } else {
      localStorage.setItem(
        "pantryItems",
        JSON.stringify([
          ...existingItems,
          newItem,
        ]),
      );
    }
    onClose();
  };

  return (
    <div className="item-modal">
      <h2>Adicionar item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="quantity">Quantidade:</label>
        <div className="quantity-input">
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={0}
            required
          />
          <button
            type="button"
            onClick={() => {
              const quantityInput = document.getElementById("quantity");
              quantityInput.value = parseInt(quantityInput.value) - 1;
            }}
          >
            -
          </button>
          <button
            type="button"
            onClick={() => {
              const quantityInput = document.getElementById("quantity");
              quantityInput.value = parseInt(quantityInput.value) + 1;
            }}
          >
            +
          </button>
        </div>
        <label htmlFor="unit">Unidade:</label>
        <select name="unit" id="unit" required>
          <option value="">Selecione unidade</option>
          <option value="unidades">Unidades</option>
          <option value="litros">Litros</option>
          <option value="quilogramas">Quilogramas</option>
        </select>
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category">
          <option value="">Selecione categoria</option>
          <option value="Laticínios">Laticínios</option>
          <option value="Padaria">Padaria</option>
          <option value="Hortifruti">Hortifruti</option>
          <option value="Carnes">Carnes</option>
          <option value="Despensa">Despensa</option>
        </select>
        <label htmlFor="room">Local:</label>
        <select name="room" id="room">
          <option value="">Selecione local</option>
          <option value="Geladeira">Geladeira</option>
          <option value="Freezer">Freezer</option>
          <option value="Despensa">Despensa</option>
        </select>
        <button type="submit">Adicionar item</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
