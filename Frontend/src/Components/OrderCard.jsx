import { updateStatus } from "../services/OrderServices";

function OrderCard({ order, loadOrders }) {

  const handleStatusChange = async (e) => {
    try {

      const status = e.target.value;

      await updateStatus(order._id, status);

      loadOrders();

    } catch (error) {
      console.log("Status Update Error:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>{order.customerName}</h3>

      <p>
        <strong>Total:</strong> ₹{order.totalAmount}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h4>Items</h4>

      {order.items.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ₹{item.price} × {item.quantity}
          </p>
        </div>
      ))}

      <br />

      <select
        value={order.status}
        onChange={handleStatusChange}
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  );
}

export default OrderCard;