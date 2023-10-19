import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios.get("https://northwind.vercel.app/api/orders").then((res) => {
      setOrders(res.data);
    });
  };

  const deleteOrder = (id) => {
    var result = window.confirm("Want to delete?");
    if (result) {
      axios
        .delete("https://northwind.vercel.app/api/orders/" + id)
        .then((res) => {
          loadOrders();
        });
    }
  };

  return (
    <div className="container mx-auto p-12">
      <h1 className="text-2xl font-semibold mb-4">
        Orders Length: {orders.length}
      </h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Id</th>
            <th className="text-left">Customer Id</th>
            <th className="text-left">Employee Id</th>
            <th className="text-left">Order Date</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customerId}</td>
                <td>{item.employeeId}</td>
                <td>{moment(item.orderDate).format("DD/MM/YYYY")}</td>
                <td>
                  <button
                    onClick={() => deleteOrder(item.id)}
                    className="text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
