import React, { Component } from 'react';

import {Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, Card, CardTitle, CardBody, CardImg } from "reactstrap";
import { Control, Form,Errors} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const isNumber=(val)=>(!val)||(!isNaN(Number(val)));//to check if the value is a number
export class AdjustProductPriceC extends Component {
    constructor(props){
        super(props);
        this.state={
            isModelOpen:false,
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }
   

  
    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }
    handleSubmit(values) {
        console.log(values.product);
       if(values.product===null){
            alert("Please Select A Product from the corresponding List");
            return;

        }
        const prod=this.props.products.filter(prod=>prod.name===values.product)[0];
        this.props.putProduct(prod._id,prod.name,prod.category,prod.description,prod.application,prod.quantity,values.price,prod.image)
        
        this.props.resetPriceForm(); 
        this.toggleModal();
    }
    render(){
        const productDropDown=this.props.products.map((prod)=>{
            return(
                <option>{prod.name}</option>
            );});
            return(
        <>
        
            <Card  elevation={5} className="col-sm-auto col-md-2 m-4" onClick={this.toggleModal}>
            <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/AdjustPrice.png"} alt="Adjust Product Price" />
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>Adjust Product Price</CardTitle>
                </CardBody>
            </Card>

            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Adjust Product Price</ModalHeader>
            <ModalBody>
                <Form model="adjustprice" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlfor="product" md={12}>Select Product To Configure</Label>
                        <Col md={12}>
                            <Control.select  model=".product" name="product" className="form-control">
                            <option value="" selected disabled>Choose Here ...</option>
                               {productDropDown}
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                                <Label htmlFor='price' md={12}>New Product Price</Label>
                                <Col md={12}>
                                    <Control.text model='.price' id='price' name="price" 
                                    placeholder="New Price..." className='form-control'
                                    validators={{
                                        required,
                                        isNumber}}/>
                                    <Errors className="text-danger"
                                    model=".price" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        isNumber: ' The Price should only contain Numbers'
                                    }}/>
                    
                                </Col>
                            </Row>
                    <Row className="form-group">
                                <Col md={{size:12}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox required model='.agree' name='agree' className='form-check-input'/>{' '}
                                            <strong>I am sure</strong>
                                        </Label>
                                    </div>
    
                                </Col>
                                </Row>
                   
                   
                    <Button type="submit" value="submit"className=" teal accent-4">Submit</Button>                            
                </Form> 
            </ModalBody>
        </Modal>
</>);
    }
}

export default AdjustProductPriceC;
