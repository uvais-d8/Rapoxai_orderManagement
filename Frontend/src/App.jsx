import { useEffect, useState } from "react";

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
      <OrderForm loadOrders={loadOrders} />

      <hr />

      <OrderList
        orders={orders}
        loadOrders={loadOrders}
      />
    </>
  );
}

export default App;