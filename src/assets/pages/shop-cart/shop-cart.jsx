import { useState, useEffect } from "react";
import "./shop-cart.css";
import ProductEditModal from "../../components/product/product_edit_modal";

import { getItems, deleteItem } from "../../../api";

export default function ShopCart() {
  const [shopCartItems, setShopCartItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      // Filtrar itens com quantidade 0 (lista de compras)
      const filteredItems = Array.isArray(items)
        ? items.filter((item) => item.quantity === "0" || item.quantity === 0)
        : [];
      setShopCartItems(filteredItems);
    };
    fetchItems();

    // Ouvir evento de item adicionado à lista de compras
    const handleItemAdded = () => {
      fetchItems();
    };
    window.addEventListener("itemAddedToShopCart", handleItemAdded);

    return () => {
      window.removeEventListener("itemAddedToShopCart", handleItemAdded);
    };
  }, []);

  // Função para atualizar a lista de compras
  const refreshShopCart = async () => {
    const items = await getItems();
    const filteredItems = Array.isArray(items)
      ? items.filter((item) => item.quantity === "0" || item.quantity === 0)
      : [];
    setShopCartItems(filteredItems);
  };

  // Abre o modal de edição do item
  const handleEdit = (item) => {
    setShowEditModal(true);
    setItem(item);
  };

  const handleDeleteFromShopCart = async (item) => {
    try {
      await deleteItem(item);
      // Remove o item da lista de compras apenas se a deleção foi bem-sucedida
      setShopCartItems((prev) =>
        prev.filter((i) => (i._id || i.id) !== (item._id || item.id)),
      );
      console.log("Item excluído com sucesso:", item);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      alert("Erro ao excluir item. Veja o console para detalhes.");
    }
  };

  const selectedGroup = JSON.parse(localStorage.getItem("selectedGroup"));

  return (
    // Exibe itens com quantidade 0
    <div className="shop_cart_container">
      <ul className="shop_cart_list">
        {shopCartItems
          .filter((item) => {
            return item.groupId === selectedGroup?._id;
          })
          .map((item, index) => (
            <li key={item.id || index} className="shop_cart_item">
              <h3>{item.name || item.nome}</h3>
              <div className="shop_cart_item_controls">
                <button
                  className="addToPantry"
                  onClick={() => handleEdit(item)}
                >
                  <i className="fa-solid fa-box-archive"></i>
                </button>
                <button
                  className="deleteFromShopCart"
                  onClick={() => handleDeleteFromShopCart(item)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
      </ul>
      {showEditModal && (
        <ProductEditModal
          onClose={() => setShowEditModal(false)}
          product={item}
          onUpdated={refreshShopCart}
        />
      )}
    </div>
  );
}
