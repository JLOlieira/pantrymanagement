import "./footer.css";
import React from "react";
import { useState } from "react";

export default function Footer() {
  const [_activeTab, _setActiveTab] = useState("pantry");

  const handleTabClick = (tab) => {
    _setActiveTab(tab);
    // Remove a classe "active" de todas as abas
    document.querySelectorAll("footer button").forEach((btn) => {
      btn.classList.remove("active");
    });
    // Adiciona a classe "active" à aba clicada
    document
      .querySelector(`footer button[value="${tab}"]`)
      .classList.add("active");
    // Mostra a seção correspondente à aba clicada
    document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
    });
    document.querySelector(`section[value="${tab}"]`).style.display = "flex";
  };

  return (
    <footer>
      <button
        value="pantry"
        className="active"
        onClick={() => handleTabClick("pantry")}
      >
        <i class="fa-solid fa-box-archive"></i>
        <p>Despensa</p>
      </button>
      <button value="shop-cart" onClick={() => handleTabClick("shop-cart")}>
        <i class="fa-solid fa-shopping-cart"></i>
        <p>Lista de compra</p>
      </button>
    </footer>
  );
}
