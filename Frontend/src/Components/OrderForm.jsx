import { useState } from "react";
import { createOrder } from "../services/OrderServices";

function OrderForm({ loadOrders }) {
  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([
    {
      name: "",
      price: 0,
      quantity: 0,
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,     
      {
        name: "",
        price: 0,
        quantity: 0,
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createOrder({
      customerName,
      items,
    });

    loadOrders();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <h2>Create Order</h2>

      <input
        placeholder="Customer Name"
        onChange={(e) => setCustomerName(e.target.value)}
      />

      {items.map((item, index) => (
        <div key={index}>
          <input
            placeholder="Item Name"
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            onChange={(e) =>
              handleChange(index, "price", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) =>
              handleChange(index, "quantity", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={addItem}>
        Add Item
      </button>

      <h3>Total: ₹{total}</h3>

      <button onClick={handleSubmit}>
        Create Order
      </button>
    </>
  );
}

export default OrderForm;