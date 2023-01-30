import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,Button,Label,Col,CardImg,Card,CardText,Row } from 'reactstrap';
import {Control,Form, Errors} from "react-redux-form";
import { baseUrl } from '../shared/baseUrl';

const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const maxLength=(len)=>((val)=>(!(val)||(val.length <=len )));
const minLength=(len)=>((val)=>(!val)||((val)&&(val.length >=len )));
const isNumber=(val)=>(!val)||(!isNaN(Number(val)));//to check if the value is a number
const validEmail=(val)=>(!val)||(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val));
class Contact extends Component {
    constructor(props){
        super(props);
        this.isActive=false;
        this.handleSubmit=this.handleSubmit.bind(this);
        }
   
    handleSubmit(values){
    
       
        console.log('Current stete is'+JSON.stringify(values));
        alert("Submitted successfully "+ values.firstname);
        this.props.postMessage(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.contactType,values.message);
        this.props.resetMessageForm();
        
    }
    
    
    render(){
        return( 
            <>
            <div className="container">
                 <div className="row">
                     <div className='container col-sm-6 ml-0 mt-2'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        </div>
                        <div className="col-12">
                            <h3>Contact Us</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="container ml-auto mr-auto">
                <div className='row m-4'>
                    <Col md={4} className="mb-2" >  
                    <Card cassName="col-xl-4 col-lg-4 col-md-4 " height="400px" width="400px">

                     
                    <CardImg src={baseUrl+"/images/mail.png" }style={{height:"320px"}}/>  
                    <CardText className="contact text-center mb-30 mt-2">  
                        <h3>Mail Us Here</h3>
                        <p>PharmacyAbsCare@hotmail.com</p>
                    </CardText>
                    </Card>
                 
                    </Col>
                    <Col md={4} className="mb-2">
                        
                    <Card cassName="col-xl-4 col-lg-4 col-md-4 " height="400px" width="400px">
                        
                    <CardImg src={baseUrl+"/images/phone.png" }style={{height:"320px"}}/>
                    <CardText className="contact text-center mb-30 mt-2">  
                        <h3>Call Us Here</h3>
                        <p>+961 71098020</p>
                    </CardText>
                    </Card>
                    </Col>
                    <Col md={4} className="mb-2">
                        
                        <Card cassName="col-xl-4 col-lg-4 col-md-4 m-2" height="400px" width="400px">
                            
                        <CardImg src={baseUrl+"/images/locationpin.png"} style={{height:"320px"}}/>
                        <CardText className="contact text-center mb-30 mt-2">  
                            <h3>Visit Us Here</h3>
                            <p>Beirut Souks, Beirut, LEBANON</p>
                        </CardText>
                        </Card>
                        </Col>
                </div>
            </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Us A message</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form model='message' onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor='firstname' md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model='.firstname' id='firstname' name="firstname" 
                                    placeholder="First Name" className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(20)}}/>
                                    <Errors className="text-danger"
                                    model=".firstname" show="touched"
                                    messages={{
                                        required: 'This Field is Required ',
                                        minLength:'The firstname must be Greater than 3 characters ',
                                        maxLength: 'The firstname must be 20 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='lastname' md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model='.lastname' id='lastname' name="lastname" 
                                    placeholder="Last Name"className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(20)}}/>
                                    <Errors className="text-danger"
                                    model=".lastname" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        minLength:'The lastname must be Greater than 3 characters',
                                        maxLength: 'The lastname must be 20 characters or less'
                                    }}/>
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='telnum' md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model='.telnum' id='telnum' name="telnum" 
                                    placeholder="Tel. Number" className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(8),
                                        maxLength:maxLength(8),
                                        isNumber}}/>
                                    <Errors className="text-danger"
                                    model=".telnum" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        minLength:'The telephone Number should be at an exact length of 8 numbers',
                                        maxLength: 'The telephone Number should be at an exact length of 8 numbers',
                                        isNumber: ' The telephone Number should contain only Numbers'
                                    }}/>
                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='email' md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model='.email' id='email' name="email" 
                                    placeholder="Email Address" className='form-control'
                                    validators={{
                                        required,
                                        validEmail}}/>
                                    <Errors
                                    className="text-danger"
                                    model='.email'
                                    show="touched"
                                    messages={{
                                        required:"This Field is Required",
                                        validEmail:"Invalid Email address"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:2}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox model='.agree' name='agree' className='form-check-input'/>{' '}
                                            <strong>May we contact you?</strong>
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
                                <Label htmlFor='message' md={2}>Your Message</Label>
                                <Col md={10}>
                                    <Control.textarea model='.message' id='message' name="message"
                                    rows="12" 
                                    placeholder="Type Your Message..." className='form-control'
                                    validators={{
                                        required,
                                        minLength:minLength(3)}}/>
                                    <Errors className="text-danger"
                                    model=".message" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        minLength:'The Message must be Greater than 3 characters',
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="default" disabled={this.isActive}>
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    
                </div>
            </div>
         </div>   
            </>
       );
    
    }
}

export default Contact;