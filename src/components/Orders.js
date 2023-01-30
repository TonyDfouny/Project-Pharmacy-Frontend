import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardBody, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import { Loading } from './LoadingComponent';

class OrdersC extends Component{

    render(){

        const listOrders=this.props.orders.map(order=>
            
            <div key={order._id} className="col-12 col-md-3 m-4 ">
            <Link to={`/orders/${order._id}`}>
            <Card>
                <CardBody className="mr-auto ml-auto">
                    Order #{order._id}
                </CardBody>
            </Card>
            </Link>

            </div>)
            if(this.props.auth.type!=1){
           
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
            if (this.props.isLoading){
                return(
                    <div className='container'>
                        <div className='row'>
                        <Loading></Loading>
                           
                        </div>
                    </div>)
    
            }
            else if(this.props.ErrMess){
                return(
                    <div className='container'>
                        <div className="row">
                            <h4>{this.props.prodErrMess}</h4>
                        </div>
    
                    </div>
                )
            }
        return(
            <div className="row ">
                {listOrders}
            </div>
            
        )
    }

}
export default OrdersC;