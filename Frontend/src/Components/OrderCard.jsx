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
   <div className="order-card">
      <h3>{order.customerName}</h3>

      <p>
        <strong>Total:</strong> ₹{order.totalAmount}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h4>Items</h4>

   <div className="order-items">
  {order.items.map((item, index) => (
    <div
      key={index}
      className="order-item"
    >
      {item.name} - ₹{item.price} × {item.quantity}
    </div>
  ))}
</div>

      <br />
<span
  className={`status ${order.status.toLowerCase()}`}
>
  {order.status}
</span>
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