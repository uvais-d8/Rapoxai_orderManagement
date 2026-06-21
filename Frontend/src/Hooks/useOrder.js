import { useState, useEffect } from "react";
import { getOrders } from "../services/orderService";

function useOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  return {
    orders,
    loadOrders
  };
}

export default useOrders;