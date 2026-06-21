import OrderCard from "./OrderCard";

function OrderList({ orders, loadOrders }) {
  return (
    <>
      <h2>Orders</h2>

      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          loadOrders={loadOrders}
        />
      ))}
    </>
  );
}

export default OrderList;