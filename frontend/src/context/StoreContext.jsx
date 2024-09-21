import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  const [ token, setToken ] = useState("")
  const [food_list, setFoodList] = useState([])

  //this function is used to add an item to the cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  //this function is used to remove an item from the cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
    }
  };

  //this is used to know the total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{}, {headers: {token}})
    setCartItems(response.data.cartData);
  }
  
  //keeps user logged in when the webpage is reloaded
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [])
  console.log(food_list)

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;





