const BASE_URL = "http://localhost:5000/orders";

export const getOrders = async () => {
  const res = await fetch(BASE_URL);

  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return res.json();
};
 
export const updateStatus = async (id, status) => {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  return response.json();
};