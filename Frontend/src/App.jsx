import { useEffect, useState } from "react";
import "./styles/order.css";
import OrderForm from "./Components/OrderForm";
import OrderList from "./Components/OrderList";

import { getOrders } from "./services/OrderServices";

function App() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await getOrders();

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <>
      <div className="container">
  <h1 className="page-title">
    Order Management System
  </h1>

  <OrderForm loadOrders={loadOrders} />

  <OrderList
    orders={orders}
    loadOrders={loadOrders}
  />
</div>
    </>
  );
}

export default App;