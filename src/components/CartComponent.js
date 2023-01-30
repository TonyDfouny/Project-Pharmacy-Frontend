import { MDBBtn } from "mdbreact";
import React, { useState,useEffect } from "react";
import styles from "./styles/Cart.module.css";

import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = ({cart,removeFromCart,adjust_qty}) => {
  const [totalPrice,setTotalPrice]=useState(0);
  const [totalItems,setTotalItems]=useState(0);

  useEffect(() => {
    let items=0;
    let price=0;
    cart.forEach(item=>{
      items+=item.quantity;
      price+=item.quantity*item.price});
      setTotalItems(items);
      setTotalPrice(price);
   
  }, [cart,totalPrice,totalItems,setTotalPrice,setTotalItems])
 
  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map(item=>
        <CartItem key={item._id} itemData={item} rmFromCart={removeFromCart} adjust_qty={adjust_qty} />
        )}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} items)</span>
          <span>$ {totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
        <MDBBtn   className=" teal accent-4 ml-auto mr-auto " position="absolute">Proceed To Checkout</MDBBtn>
        </Link>
      </div>
    </div>
  );
};

export default Cart;