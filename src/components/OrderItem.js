import React,{useState,useEffect} from "react";
import styles from "./styles/CartItem.module.css";


const OrderItem = ({itemData,orderData}) => {

  return (
    <div className={styles.cartItem}>
      <img
        className={styles.cartItem__image}
        style={{width:"200px",height:"auto"}}
        src={itemData.image}
        alt={itemData.name}
      />
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{itemData.name}</p>
        <p ><span className={styles.details__price}>Quantity: </span><span>{orderData.quantity}</span></p>
        <p><span className={styles.details__price}>Price: </span> {(orderData.productPrice)} $<span></span></p>
      </div>
    </div>
  );
};

export default OrderItem;
