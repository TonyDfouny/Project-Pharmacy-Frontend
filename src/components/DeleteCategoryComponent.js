import React, { Component } from 'react';

import {Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, Card, CardTitle, CardBody, CardImg } from "reactstrap";
import { Control, Form} from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';

export class DeleteCategoryC extends Component {
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
        if(values.category===null){
             alert("Please Select A Product from the corresponding List");
             return;
 
         }
      
        const categoryToDelete=this.props.categories.filter(cat=>cat.description===values.category)[0];
        const productsAssociated=this.props.products.filter(prod=>prod.category===categoryToDelete._id);
        productsAssociated.map(prod=>{
            this.props.deleteProduct(prod._id);
        })
        this.props.deleteCategory(categoryToDelete._id);
        alert("Your Category was Succesfully Deleted")
      this.props.resetDeleteCategoryForm();
      this.toggleModal();
    }
    render(){
        const categoryDropDown=this.props.categories.map((cat)=>{
            return(
                <option>{cat.description}</option>
            );});
            return(
        <>
        
            <Card  elevation={5} className="col-sm-auto col-md-2 m-4 "   onClick={this.toggleModal}>
            <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/deleteCategory.png"} alt="Add a new Product" />
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>Delete A Category</CardTitle>
                </CardBody>
            </Card>

            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Delete A Category</ModalHeader>
            <ModalBody>
                <Form model="dcategory" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlfor="category" md={12}>Select Category</Label>
                        <Col md={12}>
                            <Control.select  model=".category" name="category" className="form-control">
                            <option value="" selected disabled>Choose Here ...</option>
                               {categoryDropDown}
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                                <Col md={{size:12}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox required model='.agree' name='agree' className='form-check-input'/>{' '}
                                            <strong>I agree That by deleting this category, all the associated products will also be deleted!</strong>
                                        </Label>
                                    </div>
    
                                </Col>
                                </Row>
                   
                   
                    <Button type="submit" value="submit" className=" teal accent-4">Submit</Button>                            
                </Form> 
            </ModalBody>
        </Modal>
</>);
    }
}

export default DeleteCategoryC;
