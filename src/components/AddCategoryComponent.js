import React,{Component} from 'react';
import { Card, CardImg, CardBody, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle } from "reactstrap";
import { Control, Form, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const maxLength=(len)=>((val)=>(!(val)||(val.length <=len )));
const minLength=(len)=>((val)=>(!val)||((val)&&(val.length >=len )));
class AddCategoryC extends Component {
    constructor(props){
        super(props);
        this.state={
            isModelOpen:false,
            categories:this.props.categories
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }
    handleSubmit(val) {
        if (this.props.categories.filter((cat)=>cat.description===val.categoryName)[0]!=null){
            alert("This Category already exist, please add a non existing product");    
        }
        else{
        this.props.postCategory(val.categoryName);
        this.props.resetCategoryForm();
        this.toggleModal();}
    }
    render(){
        return(
        <>
        
            <Card  elevation={5} className="col-sm-auto  col-md-2 m-4" onClick={this.toggleModal}>
                <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/AddCategory.png"} alt="Add a new Product" />
                <CardBody >
                    <CardTitle style={{"font-size":"medium","font-family":"Verdana"}}>Add A New Category</CardTitle>
                </CardBody>
            </Card>

            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Add Category</ModalHeader>
            <ModalBody>
                <Form model="category" onSubmit={(val) => this.handleSubmit(val)}>
                <Row className="form-group">
                        <Label htmlFor="categoryName" md={12}>Category Name</Label>
                        <Col md={12}>
                        <Control.text model=".categoryName" id="categoryName" name="categoryName" 
                            placeholder="Category Name" 
                            className="form-control" 
                            validators={{
                                required,
                                minLength: minLength(3),
                                maxLength: maxLength(30)
                            }} 
                        />
                        <Errors className="text-danger" model=".categoryName" show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Should have more than 3 Characters',
                                maxLength: 'Should have 15 or less Characters'
                            }}
                        />
                        </Col>
                    </Row>
                            
                   
                    <Button type="submit" value="submit" className=" teal accent-4">Submit</Button>                            
                </Form> 
            </ModalBody>
        </Modal>
</>);
    }
}

export default AddCategoryC;