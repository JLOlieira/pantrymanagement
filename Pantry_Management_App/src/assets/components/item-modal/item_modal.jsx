import "./item_modal.css";

export default function ItemModal() {
  return (
    <div className="item-modal">
      <h2>Add Item</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" required />
        <label htmlFor="unit">Unit:</label>
        <select name="unit" id="unit" required>
          <option value="">Select Unit</option>
          <option value="pieces">Pieces</option>
          <option value="liters">Liters</option>
          <option value="kilograms">Kilograms</option>
        </select>
        <label htmlFor="category">Category:</label>
        <select name="category" id="category">
          <option value="">Select Category</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Produce">Produce</option>
          <option value="Meat">Meat</option>
          <option value="Pantry">Pantry</option>
        </select>
        <label htmlFor="room">Room:</label>
        <select name="room" id="room">
          <option value="">Select Room</option>
          <option value="Fridge">Fridge</option>
          <option value="Freezer">Freezer</option>
          <option value="Pantry">Pantry</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
