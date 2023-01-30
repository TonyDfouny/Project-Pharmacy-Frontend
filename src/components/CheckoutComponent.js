import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,Button,Label,Col,Card,Row, CardHeader, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Control,Form, Errors} from "react-redux-form";

const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const maxLength=(len)=>((val)=>(!(val)||(val.length <=len )));
const minLength=(len)=>((val)=>(!val)||((val)&&(val.length >=len )));
const isNumber=(val)=>(!val)||(!isNaN(Number(val)));//to check if the value is a number

class Checkout extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,}
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCart=this.handleCart.bind(this);
    }
    handleSubmit(values){
        var totalPrice=0;
        this.props.cart.map((product)=>totalPrice+=product.price*product.quantity);

        totalPrice=totalPrice.toFixed(2);
        this.props.postOrder(this.props.auth.currentUser._id,values.city,values.details,values.floor,values.contactMethod,values.addComments,totalPrice);
        this.props.resetCheckoutForm();
        this.props.fetchOrders();
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
         
        
        
            
        
    }
    handleCart(){
       
        
        
        let orderId=this.props.orders.orders[this.props.orders.orders.length-1]._id;
        this.props.cart.map((product)=>this.props.postProdOrder(orderId,product._id,product.price,product.quantity));
        this.props.cart.map((product)=>this.props.removeFromCart(product._id));

    }
    render(){
        if(this.props.auth.signed!==true){
            return(
               
                <>
                
                
                <Modal isOpen={true}   >
                    <Row>
                        <ModalHeader className="col-sm-auto col-md-auto mr-auto ml-auto" ><p>You Should Sign In to Checkout</p>
                             </ModalHeader>
                             </Row>
                             <Row className="col-sm-auto col-md-auto mr-auto ml-auto">
                        <ModalBody>
                        <Link to="/cart">
                            <Button className=" teal accent-4 col-sm-auto col-md-auto  ">Okay</Button>
                        </Link>
                    </ModalBody>
                    </Row>
                </Modal>
                
                    
                </>
            )

        }
        if(this.props.cart.length===0){
            return(
               
                <>
                
                
                <Modal isOpen={true}   >
                    <Row>
                        <ModalHeader className="col-sm-auto col-md-auto mr-auto ml-auto" ><p>Your Card Is empty You should select a Product</p>
                             </ModalHeader>
                             </Row>
                             <Row className="col-sm-auto col-md-auto mr-auto ml-auto">
                        <ModalBody>
                        <Link to="/catalogue">
                            <Button className=" teal accent-4 col-sm-auto col-md-auto  ">Okay</Button>
                        </Link>
                    </ModalBody>
                    </Row>
                </Modal>
                
                    
                </>
            )

        }
        if (this.props.ordersLoading){
            return(
                <div className='container'>
                    <div className='row'>
                    <div className='col-6 ml-auto  m-5'>
                        <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
                        <p>Submitting Your Order Please Wait...</p>
                     </div>
                       
                    </div>
                </div>)

        }
        else if(this.props.ordersErrMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{this.props.prodErrMess}</h4>
                    </div>

                </div>
            )
        }
        return(
            <>
            
            <div className='container col-sm-6 ml-0 mt-2'>
               <Breadcrumb>
               <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                   <BreadcrumbItem><Link to='/Cart'>Cart</Link></BreadcrumbItem>
                   <BreadcrumbItem active>Checkout</BreadcrumbItem>
               </Breadcrumb>
               </div>
               <div className="col-md-12 mr-auto ml-auto">
                   <h3 className='col-md-12 ml-auto mr-auto'>Checkout</h3>
                   <hr/>
               </div>
           
            <Card className="col-md-8 mb-5 mt-5 ml-auto mr-auto">
            <CardHeader className=" col-sm-12 col-md-12  mb-3 mt-3">
            <b className='col-md-12 ml-auto mr-auto '>Complete Your Order Information</b>
            </CardHeader>
        <div className=' col-sm-auto  col-md-9'>
            
            
        <Form model='checkout' onSubmit={(values)=>this.handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor='city' md={2}>City :</Label>
                <Col md={10}>
                    <Control.text  model='.city' id='city' name="city" 
                    placeholder="Type your City..." className='form-control'
                    validators={{
                        required,
                        minLength:minLength(3),
                        maxLength:maxLength(20)}}/>
                    <Errors className="text-danger"
                    model=".city" show="touched"
                    messages={{
                        required: 'This Field is Required ',
                        minLength:'The firstname must be Greater than 3 characters ',
                        maxLength: 'The firstname must be 20 characters or less'
                    }}/>
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor='details' md={2}>Detailed Address :</Label>
                <Col md={10}>
                    <Control.text model='.details' id='details' name="details" 
                    placeholder="Type your Address"className='form-control' rows="4"
                    validators={{
                        required,
                        minLength:minLength(10),
                        maxLength:maxLength(200)}}/>
                    <Errors className="text-danger"
                    model=".details" show="touched"
                    messages={{
                        required: 'This Field is Required',
                        minLength:'The Address must be Greater than 10 characters',
                        maxLength: 'The Address must be 200 characters or less'
                    }}/>
                    
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor='floor' md={2}>Floor Number :</Label>
                <Col md={10}>
                    <Control.text model='.floor' id='floor' name="floor" 
                    placeholder="Floor Number..." className='form-control'
                    validators={{
                        required,
                        maxLength:maxLength(2),
                        isNumber}}/>
                    <Errors className="text-danger"
                    model=".floor" show="touched"
                    messages={{
                        required: 'This Field is Required',
                        maxLength: 'The Floor Number should consists of one or two digits only ',
                        isNumber: ' The Floor Number should contain only Numbers'
                    }}/>
    
                </Col>
            </Row> 
            <Row className="form-group">
                <Col md={{size:6,offset:2}}>
                    <div >
                        <Label >
                            How should we contact You for Confirmation ?
                        </Label>
                    </div>

                </Col>
                <Col md={{size:3,offset:1}}>
                    <Control.select model='.contactType' name='ContactType'
                    className='from-control'>
                        <option>Tel.</option>
                        <option>Email</option>
                    </Control.select>
                    
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor='addComments' md={2}>Additional Comment</Label>
                <Col md={10}>
                    <Control.textarea model='.addComments' id='addComments' name="addComments"
                    rows="12" 
                    placeholder="Additional Comments Or Demands..." className='form-control'
                   />
                  
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={{size:10,offset:2}}>
                    <Button type="submit" className="teal accent-4"  disabled={this.isActive}>
                    Confirm
                    </Button>
                </Col>
            </Row>
        </Form>
        <>
                
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}   >
                    <Row>
                        <ModalHeader className="col-sm-auto col-md-10 mr-auto ml-auto" >
                            <h5 className='m-2'>Your Confirmation Will be sent 
                                To you Via your Preferred Method </h5>
                        </ModalHeader>
                             </Row>
                             <Row className="col-sm-auto col-md-auto mr-auto ml-auto">
                        <ModalBody>
                        <Link to="/home">
                            <Button className=" teal accent-4 col-sm-auto col-md-auto  " onClick={()=>this.handleCart()}>Okay</Button>
                        </Link>
                    </ModalBody>
                    </Row>
                </Modal>
                
                    
                </>
        
        
    
</div>
</Card>
</>)
    }

}

export default Checkout;