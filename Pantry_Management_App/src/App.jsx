import "./App.css";
import React from "react";
import { useState } from "react";
import Product from "./assets/components/product/product";
import ItemModal from "./assets/components/item-modal/item_modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <section className="pantry">
        <div>
          <h2>Pantry Items</h2>
          <button onClick={() => setShowModal(true)}>Add Item</button>
          {showModal && <ItemModal />}
        </div>
        <ul>
          <li>
            <Product
              name="Milk"
              quantity="2"
              unit="liters"
              category="Dairy"
              room="Fridge"
            />
          </li>
        </ul>
      </section>
      <section className="shopping-list">
        <h2>Shopping List</h2>
        <ul>
          <li>
            <Product
              name="Bread"
              quantity="1"
              unit="loaf"
              category="Bakery"
              room="Shopping List"
            />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
