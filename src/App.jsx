import "./App.css";
import React, { useState, useEffect } from "react";
import Product from "./assets/components/product/product";
import ItemModal from "./assets/components/item-modal/item_modal";
import ShopCart from "./assets/pages/shop-cart/shop-cart";
import Header from "./assets/components/header/header";
import Footer from "./assets/components/footer/footer";

import { rooms } from "./data.json";

import { getItems, addItem } from "./api";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [_activeTab, _setActiveTab] = useState("all");
  const [_activeSection, _setActiveSection] = useState("pantry");
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      // Garantir que é um array
      setPantryItems(Array.isArray(items) ? items : []);
    };
    fetchItems();
  }, []);

  const handleTabClick = (tab) => {
    _setActiveTab(tab);
    document.querySelectorAll(".room_filters button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`.room_filters button[value="${tab}"]`)
      .classList.add("active");
  };

  const handleAddToShopCart = async () => {
    const itemName = document.querySelector(".shop_cart_controls input").value;
    if (itemName.trim() === "") return;

    const newItem = {
      name: itemName,
      quantity: "0",
      unit: "",
      category: "",
      room: "",
    };

    try {
      const createdItem = await addItem(newItem);
      setPantryItems((prev) => [...prev, createdItem]);
      document.querySelector(".shop_cart_controls input").value = "";
      // Atualizar a lista de compras se estiver visível
      if (_activeSection === "shop-cart") {
        // Disparar um evento personalizado para atualizar a lista de compras
        window.dispatchEvent(new CustomEvent("itemAddedToShopCart"));
      }
    } catch (error) {
      console.error("Erro ao adicionar item à lista de compras:", error);
      alert("Erro ao adicionar item à lista de compras");
    }
  };

  return (
    <div className="App">
      <Header />
      <section className="pantry" value="pantry">
        <div className="pantry_header">
          <i class="fa-solid fa-user-group"></i>
          <h2>Grupo Oliveira</h2>
        </div>
        <div className="pantry_controls">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar itens..."
          />
          <ul className="room_filters">
            <li>
              <button
                value="all"
                className="active"
                onClick={() => handleTabClick("all")}
              >
                Todos
              </button>
            </li>
            {rooms
              .filter((room) => room.value != "Local")
              .map((index) => (
                <li key={index}>
                  <button
                    value={index.value}
                    className=""
                    onClick={() => handleTabClick(index.value)}
                  >
                    {index.label}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <button className="newItem_btn" onClick={() => setShowModal(true)}>
          +
        </button>

        <ul className="product_list">
          {pantryItems
            .filter((item) =>
              _activeTab === "all"
                ? item.quantity > 0
                : item.room === _activeTab && item.quantity > 0,
            )
            .map((item, index) => (
              <Product
                id={item.id || item._id}
                key={index}
                name={item.name || item.nome}
                quantity={item.quantity || item.quantidade}
                unit={item.unit || item.unidade}
                category={item.category || item.categoria}
                room={item.room || item.location}
                onRemove={() =>
                  setPantryItems((prev) =>
                    prev.filter(
                      (i) => (i.id || i._id) !== (item.id || item._id),
                    ),
                  )
                }
              />
            ))}
        </ul>
      </section>
      <section
        className="shop_cart"
        value="shop-cart"
        style={{ display: _activeSection === "shop-cart" ? "flex" : "none" }}
      >
        <div>
          <h2>Lista de compras</h2>
        </div>
        <div className="shop_cart_controls">
          <input type="text" placeholder="Adicionar item..." />
          <button onClick={handleAddToShopCart}>+</button>
        </div>
        <ShopCart />
      </section>
      {showModal && (
        <ItemModal
          onClose={() => setShowModal(false)}
          onAdded={(newItem) => setPantryItems((prev) => [...prev, newItem])}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
