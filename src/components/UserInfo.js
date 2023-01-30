import "./styles/UserCards.css"
import React,{Component} from "react";
import { MDBBtn } from "mdbreact";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

class UserInfo extends Component{
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
       
            
            return(
                <div class="col-lg-4">
        <div class="card card-margin">
            <div class="card-header no-border">
                <h5 class="card-title">USER</h5>
            </div>
            <div class="card-body pt-0">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="widget-49-date-success">
                            <span class="widget-49-date-day">{this.props.user.firstName.substr(0,1).toUpperCase()+this.props.user.lastName.substr(0,1).toUpperCase()}</span>
                        </div>
                        <div class="widget-49-meeting-info">
                            <span class="widget-49-pro-title">{this.props.user.firstName+" "+this.props.user.lastName}</span>
                            <span class="widget-49-meeting-time">User Id: {this.props.user._id}</span>
                        </div>
                    </div>
                    <ul class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Email: </span><span style={{"font-size":"medium"}}>{this.props.user.email}</span></li>
                        <li class="widget-49-meeting-item"><span style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Tel num.: </span><span style={{"font-size":"medium"}}>{this.props.user.telnum}</span></li>
                        <li class="widget-49-meeting-item"><span style={{"font-size":"medium","fontWeight":"bold","color":"teal"}}>Birthday : </span><span style={{"font-size":"medium"}}>{this.props.user.dateOfBirth}</span></li>                        
                    </ul>
                    <div class="widget-49-meeting-action">
                        <MDBBtn onClick={this.toggleModal}>Delete User</MDBBtn>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}  >
        <ModalHeader toggle={this.toggleModal} >Are You sure You want to delete This User</ModalHeader>
          <ModalBody>
            <Row>
            <div className=" col-sm-auto col-md-5 ml-auto mr-auto" >
              <Button className=" teal accent-4 col-md-12 ml-auto mr-auto "  onClick={this.toggleModal}>No</Button>
              </div>
              <div className=" col-sm-auto col-md-5 ml-auto mr-auto  "  >
                <Button  className=" teal accent-4 col-md-12 ml-auto mr-auto" onClick={()=>{this.toggleModal();this.props.putUser(this.props.user._id,this.props.user.firstName,this.props.user.lastName,this.props.user.password,this.props.user.email,this.props.user.telnum,this.props.user.dateOfBirth)}} >Yes</Button>
              </div>

            </Row>
        </ModalBody>
        </Modal> 
    </div>)
    }
}


export default UserInfo


