import "./product_edit_modal.css";
import React from "react";
import { useState } from "react";

export default function ProductEditModal({ onClose, product }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedItem = {
      nome: formData.get("name"),
      quantidade: formData.get("quantity"),
      unidade: formData.get("unit"),
      categoria: formData.get("category"),
      local: formData.get("room"),
    };
    const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const updatedItems = pantryItems.map((item) => {
      if (
        item.nome === product.name &&
        item.quantidade === product.quantity &&
        item.unidade === product.unit
      ) {
        return updatedItem;
      }
      return item;
    });
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    onClose();
    window.location.reload();
  };

  return (
    <div className="product-edit-modal">
      <h2>Editar item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={product.name}
          required
        />
        <label htmlFor="quantity">Quantidade:</label>
        <div className="quantity-input">
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue={product.quantity}
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
        <select name="unit" id="unit" defaultValue={product.unit} required>
          <option value="">Selecione unidade</option>
          <option value="unidades">Unidades</option>
          <option value="litros">Litros</option>
          <option value="quilogramas">Quilogramas</option>
        </select>
        <label htmlFor="category">Categoria:</label>
        <select name="category" id="category" defaultValue={product.category}>
          <option value="">Selecione categoria</option>
          <option value="Laticínios">Laticínios</option>
          <option value="Padaria">Padaria</option>
          <option value="Hortifruti">Hortifruti</option>
          <option value="Carnes">Carnes</option>
          <option value="Despensa">Despensa</option>
        </select>
        <label htmlFor="room">Local:</label>
        <select name="room" id="room" defaultValue={product.room}>
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
  );
}
