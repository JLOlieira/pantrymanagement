import "./App.css";
import React from "react";
import { useState } from "react";
import Product from "./assets/components/product/product";
import ItemModal from "./assets/components/item-modal/item_modal";
import ShopCart from "./assets/pages/shop-cart/shop-cart";
import Footer from "./assets/components/footer/footer";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSection, setActiveSection] = useState("pantry");

  // Função para destacar a aba ativa
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Remove a classe "active" de todas as abas
    document.querySelectorAll(".room_filters button").forEach((btn) => {
      btn.classList.remove("active");
    });
    // Adiciona a classe "active" à aba clicada
    document
      .querySelector(`.room_filters button[value="${tab}"]`)
      .classList.add("active");
  };

  return (
    <div className="App">
      <section className="pantry" value="pantry">
        <div className="pantry_header">
          <h2>Itens da despensa</h2>
          <button onClick={() => setShowModal(true)}>Adicionar item</button>
        </div>
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
            <button value="Despensa" onClick={() => handleTabClick("Despensa")}>
              Despensa
            </button>
          </li>
        </ul>

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
        <h2>Lista de compras</h2>
        <ShopCart />
      </section>
      {showModal && <ItemModal onClose={() => setShowModal(false)} />}
      <Footer />
    </div>
  );
}

export default App;
