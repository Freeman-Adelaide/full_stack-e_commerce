import React, {useState} from 'react'
import {toast} from "react-toastify"
import './Orders.css'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {
  const [orders, setOrders ] = useState([])

  const fetchAllOrders = async () => {

    const token = await localStorage.getItem('adminToken'); // Retrieve token from localStorage

      if(!token){
        //If there's no token, return an error message early
        toast.error("Unauthorized: Please log in");
        return;
      }
      console.log(token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
    const response = await axios.get(url+"/api/order/list", config);
    if (response.data.success) {
      // Check if data is an array
      if (Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        toast.error("Unexpected data format");
      }
    } else {
      toast.error("Error");
    }
  }

  const statusHandler = async (event, orderId) => {
    
    const token = await localStorage.getItem('adminToken'); // Retrieve token from localStorage

      if(!token){
        //If there's no token, return an error message early
        toast.error("Unauthorized: Please log in");
        return;
      }
      console.log(token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      

    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: event.target.value
    }, config)
    if(response.data.success){
      fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  }
                  else{
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                  <p>{order.address.street + ','}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>     
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders