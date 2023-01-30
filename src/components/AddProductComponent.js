import React,{Component} from 'react';
import { Card, CardImg, CardBody, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle } from "reactstrap";
import { Control, Form, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';

const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const maxLength=(len)=>((val)=>(!(val)||(val.length <=len )));
const minLength=(len)=>((val)=>(!val)||((val)&&(val.length >=len )));
const isNumber=(val)=>(!val)||(!isNaN(Number(val)));//to check if the value is a number
class AddProductC extends Component {
    constructor(props){
        super(props);
        this.state={
            image:'',
            isModelOpen:false,
            categories:this.props.categories
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleUpload=this.handleUpload.bind(this);


    }
    handleFile(e){
        let file=e.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload=(e)=>{console.log(e.target.result)}
        this.setState({image:file})
    }
    handleUpload(values,category){
        let file=this.state.image  
        let reader=new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload=(e)=>{
            this.props.postProduct(values.productName,category,values.description,values.application,values.quantity,values.price,e.target.result);

        }
        
    }
    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }
    handleSubmit(values) {
        if(values.category===null){
            alert("Please Select A Category for the Product from the corresponding List");
            return;

        }
        const cat=this.props.categories.filter((categ)=>categ.description===values.category)[0];
        const category=cat._id;
        if (this.props.products.filter((product)=>product.name===values.productName)[0]!=null){
            alert("This product already exist, please add a non existing product");    
        }
        else{
          this.handleUpload(values,category);
        
        this.props.resetProductForm();
        this.toggleModal();}
    }
    render(){
        const categoryDropDown=this.state.categories.map((cat)=>{
            return(
                <option>{cat.description}</option>
            );});
            return(
        <>
        
            <Card  elevation={5} className="col-sm-auto col-md-2 m-4" onClick={this.toggleModal}>
                <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/AddProduct.png"} alt="Add a new Product" />
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>Add A New Product</CardTitle>
                </CardBody>
            </Card>

            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Add Product</ModalHeader>
            <ModalBody>
                <Form model="product" onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                        <Label htmlFor="productName" md={12}>Product Name</Label>
                        <Col md={12}>
                        <Control.text model=".productName" id="productName" name="productName" 
                            placeholder="Product Name" 
                            className="form-control" 
                            validators={{
                                required,
                                minLength: minLength(3),
                                maxLength: maxLength(15)
                            }} 
                        />
                        <Errors className="text-danger" model=".productName" show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Should have more than 3 Characters',
                                maxLength: 'Should have 15 or less Characters'
                            }}
                        />
                        </Col>
                    </Row>
                   
                    <Row className="form-group">
                        <Label htmlfor="category" md={12}>Product Category</Label>
                        <Col md={12}>
                            <Control.select model=".category" name="category" className="form-control" required>
                            <option value="" selected disabled>Choose here</option>
                               {categoryDropDown}
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlfor="image" md={12}>Upload Product Image</Label>
                        <Col md={12}>
                            <Control.file model=".image" name="image" className="form-control" onChange={(e)=>this.handleFile(e)} required>
                           
                            </Control.file>
                        </Col>
                    </Row>
                    <Row className="form-group">
                                <Label htmlFor='description' md={12}>Product Description</Label>
                                <Col md={12}>
                                    <Control.textarea model='.description' id='description' name="description"
                                    rows="6" 
                                    placeholder="Type Product Description..." className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(3)}}/>
                                    <Errors className="text-danger"
                                    model=".description" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        minLength:'The Description must be Greater than 3 characters',
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='application' md={12}>Product Application</Label>
                                <Col md={12}>
                                    <Control.textarea model='.application' id='application' name="application"
                                    rows="6" 
                                    placeholder="Type Product application..." className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(3)}}/>
                                    <Errors className="text-danger"
                                    model=".application" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        minLength:'The application text must be Greater than 3 characters',
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='quantity' md={12}>Product Quantity</Label>
                                <Col md={12}>
                                    <Control.text model='.quantity' id='quantity' name="quantity" 
                                    placeholder="Quantity" className='form-control'
                                    validators={{
                                        required,
                                        isNumber}}/>
                                    <Errors className="text-danger"
                                    model=".quantity" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        isNumber: ' The Quantity should contain only Numbers'
                                    }}/>
                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='price' md={12}>Product Price</Label>
                                <Col md={12}>
                                    <Control.text model='.price' id='price' name="price" 
                                    placeholder="Price" className='form-control'
                                    validators={{
                                        required,
                                        isNumber}}/>
                                    <Errors className="text-danger"
                                    model=".price" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        isNumber: ' The Price should contain only Numbers',
                                    }}/>
                    
                                </Col>
                            </Row>              
                   
                    <Button type="submit" value="submit" className=" teal accent-4">Submit</Button>                            
                </Form> 
            </ModalBody>
        </Modal>
</>);
    }
}

export default AddProductC;