import { MDBBtn } from "mdbreact";
import React, { Component,useEffect } from "react";
import styles from "./styles/Cart.module.css";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Button, Card, CardBody, CardText, CardTitle, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import OrderItem from "./OrderItem";
import { deleteProdOrder } from "../redux/ActionCreators";


class OrderDetails extends Component{
  constructor(props){
    super(props)
    this.state={
      isModalOpen:false}
      this.toggleModal=this.toggleModal.bind(this);
      this.confirmProceed=this.confirmProceed.bind(this);
      
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  confirmProceed(){
    this.props.productsOrder.map(item=>this.props.deleteProdOrder(item._id))
    this.props.deleteOrder(this.props.order._id);
  }
  render(){
    if(this.props.auth.type!==1){
           
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
      
    if (this.props.productsLoading){
      return(
          <div className='container'>
              <div className='row'>
              <div className='col-6 ml-auto  m-5'>
                  <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
                  <p>Please Wait...</p>
               </div>
                 
              </div>
          </div>)

  }
  else if(this.props.productsErrMess){
      return(
          <div className='container'>
              <div className="row">
                  <h4>{this.props.productsErrMess}</h4>
              </div>

          </div>
      )
  }
  if (this.props.isLoading){
    return(
        <div className='container'>
            <div className='row'>
           <Loading/>
               
            </div>
        </div>)

 }
 else if(this.props.errMess){
    return(
        <div className='container'>
            <div className="row">
                <h4>{this.props.errMess}</h4>
            </div>

        </div>
    )
 }
 
  return (
    <div className={styles.cart}>
       <div className={styles.cart__items}>
         {this.props.productsOrder.map(item=>
        <OrderItem key={item.productId} itemData={this.props.products.filter(product=>product._id===item.productId)[0]} orderData={item}  />
        )} 
      </div> 
      <Card  style={{"width": "500px","object-fit": "contain","height":"full"}}>
        <CardTitle>Order Summary</CardTitle>
        <CardBody>
          <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>User Id: </span>
            <span style={{"font-size":"medium"}}>{this.props.order.userId}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>City: </span>
            <span style={{"font-size":"medium"}}>{this.props.order.city}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Adress Detail: </span>
            <span className="col-md-9" style={{"font-size":"medium"}}>{this.props.order.details}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Floor: </span>
            <span style={{"font-size":"medium"}}>{this.props.order.floor}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Additional Comments: </span>
            <span style={{"font-size":"medium"}}>{this.props.order.addComments}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Date: </span>
            <span style={{"font-size":"medium"}}>{this.props.order.date}</span>
            </CardText>
            <CardText><span  style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>TOTAL: $ {this.props.order.totalPrice}</span>
            </CardText>
            
                <MDBBtn   className=" red darken-3 col-md-4 m-3 "  position="absolute" onClick={this.toggleModal}>Decline</MDBBtn>
      
            <MDBBtn   className=" teal accent-4 col-md-4 m-3  " position="absolute" onClick={this.toggleModal}>Accept</MDBBtn>
          
          
          </CardBody>
      </Card>
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}  >
        <ModalHeader toggle={this.toggleModal} >If you Accept or decline, either way the order would be deleted!!!</ModalHeader>
          <ModalBody>
            <Row>
            <div className=" col-sm-auto col-md-5 ml-auto mr-auto" >
              <Button className=" teal accent-4 col-md-12 ml-auto mr-auto "  onClick={this.toggleModal}>No</Button>
              </div>
              <Link className=" col-sm-auto col-md-5 ml-auto mr-auto  " to="/admin" >
                <Button  className=" teal accent-4 col-md-12 ml-auto mr-auto" onClick={this.confirmProceed} >Proceed</Button>
              </Link>

            </Row>
        </ModalBody>
        </Modal> 
      {/* <div className={styles.cart__summary}>
       <div>
            <span className={styles.summary__title}>User Email: </span>
        </div>
      
        
      </div> */}
    </div>
  );
};
}

export default OrderDetails;