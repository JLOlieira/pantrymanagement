import { useState } from "react";
import "./shop-cart.css";
import Product from "../../components/product/product";
import ItemModal from "../../components/item-modal/item_modal";

export default function ShopCart() {
  const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");

  const [showModal, setShowModal] = useState(false);

  // Abre o modal para adicionar itens à despensa e carrega os inputs com os dados do item selecionado
  const handleAddToPantry = (item) => {
    setShowModal(true);
    setTimeout(() => {
      document.getElementById("name").value = item.nome;
      document.getElementById("quantity").value = item.quantidade;
      document.getElementById("unit").value = item.unidade;
      document.getElementById("category").value = item.categoria;
      document.getElementById("room").value = item.local;
    }, 100);
  };
  const handleDeleteFromShopCart = (item) => {
    const updatedItems = pantryItems.filter(
      (pantryItem) =>
        pantryItem.nome !== item.nome || pantryItem.local !== item.local,
    );
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
  };

  return (
    // Exibe itens com quantidade 0
    <div>
      <ul className="shop_cart_list">
        {pantryItems
          .filter((item) => item.quantidade === "0")
          .map((item, index) => (
            <li key={index} className="shop_cart_item">
              <h3>{item.nome}</h3>
              <div className="shop_cart_item_controls">
                <button
                  className="addToPantry"
                  onClick={() => handleAddToPantry(item)}
                >
                  <i class="fa-solid fa-box-archive"></i>
                </button>
                <button
                  className="deleteFromShopCart"
                  onClick={() => handleDeleteFromShopCart(item)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
      </ul>
      {showModal && <ItemModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
