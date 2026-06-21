import { useState } from "react";
import { createOrder } from "../services/OrderServices";

function OrderForm({ loadOrders }) {
  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([
    {
      name: "",
      price: "",
      quantity: "",
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    setItems(updatedItems);

    setErrors((prev) => ({
      ...prev,
      [`${field}-${index}`]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    } else if (customerName.trim().length < 3) {
      newErrors.customerName =
        "Customer name must be at least 3 characters";
    }

    items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`name-${index}`] =
          "Item name is required";
      }

      if (!item.price || Number(item.price) <= 0) {
        newErrors[`price-${index}`] =
          "Price must be greater than 0";
      }

      if (!item.quantity || Number(item.quantity) <= 0) {
        newErrors[`quantity-${index}`] =
          "Quantity must be greater than 0";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addItem = () => {
    const newErrors = {};

    items.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`name-${index}`] =
          "Item name is required";
      }

      if (!item.price || Number(item.price) <= 0) {
        newErrors[`price-${index}`] =
          "Enter a valid price";
      }

      if (!item.quantity || Number(item.quantity) <= 0) {
        newErrors[`quantity-${index}`] =
          "Enter a valid quantity";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setItems([
      ...items,
      {
        name: "",
        price: "",
        quantity: "",
      },
    ]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!customerName.trim()) {
    newErrors.customerName =
      "Customer name is required";
  }

  const validItems = items.filter(
    (item) =>
      item.name.trim() &&
      Number(item.price) > 0 &&
      Number(item.quantity) > 0
  );

  if (validItems.length === 0) {
    newErrors.items =
      "Please add at least one valid item";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  await createOrder({
    customerName,
    items: validItems,
  });

  await loadOrders();

  setCustomerName("");

  setItems([
    {
      name: "",
      price: "",
      quantity: "",
    },
  ]);

  setErrors({});
};

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <div className="order-form">
      <h2>Create Order</h2>
      <div>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);

            setErrors((prev) => ({
              ...prev,
              customerName: "",
            }));
          }}
        />

        {errors.customerName && (
          <p className="error">
            {errors.customerName}
          </p>
        )}
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="item-card"
        >
          <h4>Item {index + 1}</h4>

{errors.items && (
  <p className="error">
    {errors.items}
  </p>
)}
          <div>
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) =>
                handleChange(
                  index,
                  "name",
                  e.target.value
                )
              }
            />

            {errors[`name-${index}`] && (
              <p className="error">
                {errors[`name-${index}`]}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleChange(
                  index,
                  "price",
                  e.target.value
                )
              }
            />

            {errors[`price-${index}`] && (
              <p className="error">
                {errors[`price-${index}`]}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleChange(
                  index,
                  "quantity",
                  e.target.value
                )
              }
            />

            {errors[`quantity-${index}`] && (
              <p className="error">
                {errors[`quantity-${index}`]}
              </p>
            )}
          </div>
        </div>
      ))}

      <h3 className="total">
        Total: ₹{total}
      </h3>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={addItem}
        >
          Add Item
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Create Order
        </button>
      </div>
    </div>
  );
}

export default OrderForm;