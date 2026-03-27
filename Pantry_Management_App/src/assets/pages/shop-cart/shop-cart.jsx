import "./shop-cart.css";
import Product from "../../components/product/product";

export default function ShopCart() {
  const pantryItems = JSON.parse(localStorage.getItem("pantryItems") || "[]");

  return (
    // Exibe itens com quantidade 0
    <div>
      <ul className="shop_cart_list">
        {pantryItems
          .filter((item) => item.quantidade === "0")
          .map((item, index) => (
            <li key={index} className="shop_cart_item">
              <h3>{item.nome}</h3>
              <div>
                <button>Add a despensa</button>
                <button>Excluir da lista</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
