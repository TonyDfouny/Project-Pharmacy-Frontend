import React,{Component} from 'react';
import {Button,Label, Row, Col} from "reactstrap";
import { Control, Form, Errors } from 'react-redux-form';

const required=(val)=>val&&val.length;//check if the legnth of value is greater then zero
const validEmail=(val)=>(!val)||(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val));


class SignInForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    handleSubmit(values) {
        if (this.props.users.filter((user)=>user.email===values.email)[0]===undefined){
        alert("This email doesn't exist, please use an available email or sign up");
         
    }
    else{
        var user=this.props.users.filter((user)=>user.email===values.email)[0];
        
        if (user.password!==values.password){
            alert("The pasword is incorrect! Please Try Again");

        }else if(user.dateOfDelete!==null){alert("Your Account is Banned, contact Us for Information!");this.props.resetSignInForm();}
        else{ 
            
            this.props.login(user);  
     
        this.props.resetSignInForm();
        this.props.toggle();
        } 
    }
    }
       
    
    render(){
            return(
        <>
                <Form model="signin" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                           
                            <Label className="fas fa-envelope " md={1}></Label><Col md={11}>
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
                            <Label className="fas fa-lock " md={1}></Label>
                                <Col md={11}>
                                    <Control.password model='.password' id='password' name="password" 
                                    placeholder="Type your Password" className='form-control'
                                    validators={{
                                        required,
                                        }}/>
                                    <Errors className="text-danger"
                                    model=".password" show="touched"
                                    messages={{
                                        required: 'This Field is Required',
                                    }}/>
                    
                                </Col>
                            </Row>
                    <Button type="submit" value="submit" className=" teal accent-4">Submit</Button>                            
                </Form> 
</>);
    }
}

export default SignInForm;