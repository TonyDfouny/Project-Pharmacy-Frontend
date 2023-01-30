import React,{Component} from 'react';
import {Button,Label, Row, Col} from "reactstrap";
import { Control, Form, Errors } from 'react-redux-form';
const d=new Date();
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{6,})");
const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const maxLength=(len)=>((val)=>(!(val)||(val.length <=len )));
const minLength=(len)=>((val)=>(!val)||((val)&&(val.length >=len )));
const isNumber=(val)=>(!val)||(!isNaN(Number(val)));//to check if the value is a number
const validEmail=(val)=>(!val)||(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val));
const validPassword=(val)=>(!val)||(strongRegex.test(val));
const validDate=(val)=>(!val)||(Number(d.getFullYear())-Number(val.substr(0,4))>=18);

class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    handleSubmit(values) {
      if (this.props.users.filter((user)=>user.email===values.email)[0]!=null){
        alert("This email is used, please enter another email");  
    }
    else{
      this.props.postUser(values.firstName,values.lastName,values.password,values.email,values.telnum,values.date);
      alert("Registration successful");
        this.props.resetSignUpForm();
        this.props.toggle();}
    }
       
    
    render(){
            return(
        <>
                <Form model="signup" onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                        <Label htmlFor="firstName" md={12}>First Name</Label>
                        <Col md={12}>
                        <Control.text model=".firstName" id="firstName" name="firstName"  
                            placeholder="Type your First Name ..." 
                            className="form-control" 
                            validators={{
                                required,
                                minLength: minLength(3),
                                maxLength: maxLength(15)
                            }} 
                        />
                        <Errors className="text-danger" model=".firstName" show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Should have more than 2 Characters',
                                maxLength: 'Should have 15 or less Characters'
                            }}
                        />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="lastName" md={12}>Last Name</Label>
                        <Col md={12}>
                        <Control.text model=".lastName" id="lastName" name="lastName" 
                            placeholder="Type your Last Name ..." 
                            className="form-control" 
                            validators={{
                                required,
                                minLength: minLength(3),
                                maxLength: maxLength(15)
                            }} 
                        />
                        <Errors className="text-danger" model=".lastName" show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Should have more than 2 Characters',
                                maxLength: 'Should have 15 or less Characters'
                            }}
                        />
                        </Col>
                      </Row>
                      <Row className="form-group">
                                <Label htmlFor='password' md={12}>Password</Label>
                                <Col md={12}>
                                    <Control.password model='.password' id='password' name="password" 
                                    placeholder="Type your Password" className='form-control'
                                    validators={{
                                        required,
                                        validPassword}}/>
                                    <Errors className="text-danger"
                                    model=".password" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        validPassword: ' The password should be at least 6 characters which contain at least 1 number, 1 uppercase and 1 lowercase letter and 1 special character',
                                    }}/>
                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='email' md={12}>Email</Label>
                                <Col md={12}>
                                    <Control.text model='.email' id='email' name="email" 
                                    placeholder="Type your Email Address..." className='form-control'
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
                                <Label htmlFor='telnum' md={12}>Contact Tel.</Label>
                                <Col md={12}>
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
                                <Label htmlfor="date" md={12}>Select Your Date Of Birth</Label>
                                <Col md={12}>
                                    <Control type="date"  model=".date" id="date"name="date" className="form-control"
                                    min="1930-01-01"   validators={{
                                      required,
                                      validDate}}/>
                                      <Errors className="text-danger"
                                    model=".date" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                        validDate:"You should be older than 18 years old"}}/>
                                    
                               
                                </Col>
                            </Row>
                   
                    
                   
                    <Button type="submit" value="submit" className=" teal accent-4">Submit</Button>                            
                </Form> 
</>);
    }
}

export default RegisterPage;