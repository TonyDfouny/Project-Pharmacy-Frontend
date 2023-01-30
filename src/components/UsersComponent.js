import "./styles/UserCards.css"
import React,{Component} from "react";
import { MDBBtn } from "mdbreact";
import { Loading } from "./LoadingComponent";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

class UserComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
        }
        this.toggleModal=this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    
    render(){
        const Userlist=(this.props.users.users.map(user=>{
            if(user.type===0 && user.dateOfDelete===null){return(
            <UserInfo user={user} putUser={this.props.putUser}/>
            )}
        }))
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
            
        if (this.props.users.isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>)
        
        }
        else if(this.props.users.errMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{this.props.users.errMess}</h4>
                    </div>
        
                </div>
            )
        }
        return(
    <div class="container m-2">
    <div class="row">
        {Userlist}
    
    
</div>
</div>)
    }
}
export default UserComponent;