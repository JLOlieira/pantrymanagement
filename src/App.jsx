import "./App.css";
import React from "react";
import { useState } from "react";
import Product from "./assets/components/product/product";
import ItemModal from "./assets/components/item-modal/item_modal";
import ShopCart from "./assets/pages/shop-cart/shop-cart";
import Header from "./assets/components/header/header";
import Footer from "./assets/components/footer/footer";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSection, setActiveSection] = useState("pantry");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.querySelectorAll(".room_filters button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`.room_filters button[value="${tab}"]`)
      .classList.add("active");
  };

  const handleAddToShopCart = () => {
    const itemName = document.querySelector(".shop_cart_controls input").value;
    if (itemName.trim() === "") return;
    const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const existingItemIndex = pantryItems.findIndex(
      (item) => item.nome.toLowerCase() === itemName.toLowerCase(),
    );
    if (existingItemIndex !== -1) {
      pantryItems[existingItemIndex].quantidade = "0";
      localStorage.setItem("pantryItems", JSON.stringify(pantryItems));
    } else {
      localStorage.setItem(
        "pantryItems",
        JSON.stringify([
          ...pantryItems,
          {
            nome: itemName,
            quantidade: "0",
            unidade: "",
            categoria: "",
            local: "",
          },
        ]),
      );
    }
    document.querySelector(".shop_cart_controls input").value = "";
    window.location.reload();
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
            <li>
              <button
                value="Geladeira"
                onClick={() => handleTabClick("Geladeira")}
              >
                Geladeira
              </button>
            </li>
            <li>
              <button value="Freezer" onClick={() => handleTabClick("Freezer")}>
                Freezer
              </button>
            </li>
            <li>
              <button
                value="Despensa"
                onClick={() => handleTabClick("Despensa")}
              >
                Despensa
              </button>
            </li>
            <li>
              <button
                value="Despensa"
                onClick={() => handleTabClick("Despensa")}
              >
                Despensa
              </button>
            </li>
          </ul>
        </div>
        <button className="newItem_btn" onClick={() => setShowModal(true)}>
          +
        </button>

        <ul className="product_list">
          {JSON.parse(localStorage.getItem("pantryItems") || "[]")
            .filter(
              (item) =>
                activeTab === "all" &&
                (item.quantidade != "0" || item.local === activeTab),
            )
            .map((item, index) => (
              <li key={index}>
                <Product
                  name={item.nome}
                  quantity={item.quantidade}
                  unit={item.unidade}
                  category={item.categoria}
                  room={item.local}
                />
              </li>
            ))}
        </ul>
      </section>
      <section
        className="shop_cart"
        value="shop-cart"
        style={{ display: activeSection === "shop-cart" ? "block" : "none" }}
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
      {showModal && <ItemModal onClose={() => setShowModal(false)} />}
      <Footer />
    </div>
  );
}

export default App;
