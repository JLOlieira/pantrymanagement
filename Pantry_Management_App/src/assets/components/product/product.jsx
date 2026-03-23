

export default function Product({name, quantity, unit, category, room}) {
  return(
    <div className="product">
      <h3>{name}</h3>
      <p>{quantity} {unit}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}