import "./item_modal.css";
import Input from "../input/input";
import Select from "../select/select";
import Button from "../button/button";

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
    const existingItems = JSON.parse(
      localStorage.getItem("pantryItems") || "[]",
    );
    const existingItemIndex = existingItems.findIndex(
      (item) => item.nome === newItem.nome && item.local === newItem.local,
    );
    if (existingItemIndex !== -1) {
      existingItems[existingItemIndex].quantidade = (
        parseInt(existingItems[existingItemIndex].quantidade) +
        parseInt(newItem.quantidade)
      ).toString();
      localStorage.setItem("pantryItems", JSON.stringify(existingItems));
    } else {
      localStorage.setItem(
        "pantryItems",
        JSON.stringify([...existingItems, newItem]),
      );
    }
    onClose();
  };

  return (
    <div className="item-modal">
      <h2>Adicionar item</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" placeholder="Nome do item" />
        <Input label="Quantidade" type="number" placeholder="Quantidade" />
        <Select
          label="Unidade"
          options={[{ label: "Unidade", value: "unidade" }, { label: "Litros", value: "l" }, { label: "kg", value: "kg" }]}
        />
        <Select
          label="Categoria"
          options={[{ label: "Categoria", value: "Categoria" }, { label: "Laticínios", value: "Laticínios" }, { label: "Padaria", value: "Padaria" }, { label: "Hortifruti", value: "Hortifruti" }, { label: "Carnes", value: "Carnes" }, { label: "Despensa", value: "Despensa" }]}
        />
        <Select label="Local" options={[{ label: "Local", value: "Local" }, { label: "Geladeira", value: "Geladeira" }, { label: "Freezer", value: "Freezer" }, { label: "Despensa", value: "Despensa" }]} />
        <div className="modal-buttons">
          <Button className="add-item-btn" label="Adicionar" onClick={handleSubmit} />
          <Button className="cancel-btn" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}
