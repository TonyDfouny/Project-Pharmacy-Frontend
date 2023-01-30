import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import styles from "./styles/CartItem.module.css";



const MessageItem = ({itemData,deleteMessage}) => {
  return (
    <div >
    <div className={styles.cartItem}>
       <img
        className={styles.cartItem__image}
        style={{width:"200px",height:"auto"}}
        src={baseUrl+"/images/message.png"}
        alt="MESSAGE"
      />
      <div className={styles.cartItem__details}>
        <p><span className={styles.details__title}>Message From: </span><span >{itemData.firstName} {itemData.lastName}</span></p>
        <p className={styles.details__desc}>{itemData.message}</p>
        <p><span className={styles.details__title}>Date: </span><span >{itemData.date}</span></p>
        
        <p>
        <span className={styles.details__title}>Does he want to be contacted from us: </span><span >{itemData.flag?"Yes ":"No"}{itemData.flag?"By "+itemData.contactMethod:""}</span>
        </p>
        <p>
            <span className="mr-2"><i className="fas fa-mobile-alt mr-1" /> {itemData.telnum} </span><span><i className="fas fa-at mr-1" ></i> {itemData.email}</span>

        </p>
      </div>
      <div className={styles.cartItem__actions}>
        <button onClick={()=>{deleteMessage(itemData._id);alert("Messsage succesfully deleted")}} className={styles.actions__deleteItemBtn}>
          <span className="fas fa-dumpster"></span>
        </button>
      </div>
    </div>
    </div>
  );
};



const AllMessages = ({messages,isLoading,errMess,deleteMessage,auth}) => {
  if (isLoading){
    return(
        <div className='container'>
            <div className='row'>
                <Loading/>
            </div>
        </div>)

}
else if(errMess){
    return(
        <div className='container'>
            <div className="row">
                <h4>{errMess}</h4>
            </div>

        </div>
    )
}
if(auth.type!==1){
           
  return(
     
      <>
      
      
      <Modal isOpen={true}   >
          <Row>
              <ModalHeader className="col-sm-auto col-md-auto mr-auto ml-auto" ><p>UNAUTHORIZED ACCESS!!!</p>
                   Redirecting you to Home page</ModalHeader>
                   </Row>
                   <Row className="col-sm-auto col-md-auto mr-auto ml-auto">
              <ModalBody>
              <Link to="/home">
                  <Button className=" teal accent-4 col-sm-auto col-md-auto  ">Okay</Button>
              </Link>
          </ModalBody>
          </Row>
      </Modal>
      
          
      </>
  )
}
  
  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {messages.map(item=>
        <MessageItem key={item._id} itemData={item} deleteMessage={deleteMessage}  />
        )}
      </div>
    </div>
  );
};

export default AllMessages;
