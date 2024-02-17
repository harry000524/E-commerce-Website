import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://d-and-j-diner.onrender.com/orders')
      .then(response => {
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Barangay</th>
            <th>Purok</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.barangay}</td>
              <td>{order.purok}</td>
              <td>{order.email}</td>
              <td>{order.orders.join(', ')}</td>
              <td>{order.payment}</td>
              <td>{order.total}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
