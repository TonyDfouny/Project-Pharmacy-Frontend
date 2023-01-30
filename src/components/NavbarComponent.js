import React,{Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,Button, Modal, ModalBody,ModalHeader, Row } from 'reactstrap';
import{Link, NavLink} from'react-router-dom';
import styles from './styles/Cart.module.css'
import RegisterPage from './Register';

import SignInForm from './SignIn';
import {
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false,
            isModalOpen:false,
            isRegModalOpen:false,
            isLogoutModalOpen:false,
            curTime : null
            

        };
        this.cartCounter=0;
        this.interval=null;
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.toggleLogoutModal=this.toggleLogoutModal.bind(this);
        this.toggleRegModal=this.toggleRegModal.bind(this);
        this.ConfirmLogout=this.ConfirmLogout.bind(this);
        }
       
    
    componentDidMount(){
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 200);
        
    }
    componentDidUnmount(){
        clearInterval(this.interval);
    }
    componentDidUpdate(){
        let count=0;
        this.props.cart.forEach(item=>count+=item.quantity);
        this.cartCounter=count;    
    }
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    };
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    toggleRegModal() {
        this.setState({
          isRegModalOpen: !this.state.isRegModalOpen
        });
      }
      toggleLogoutModal() {
        this.setState({
            isLogoutModalOpen:!this.state.isLogoutModalOpen
        });
      }
      ConfirmLogout(){
        this.props.logout();
        this.toggleLogoutModal();
        
      }
    
    render(){
        
       
        const categoryDropDown=this.props.categories.map((cat)=>{
            return(
                <NavLink to={`/catalogue/${cat._id}`}>
                      <MDBDropdownItem>{cat.description}</MDBDropdownItem>
                </NavLink>
            );});
            
        if(this.props.auth.signed===false){return(
            <>
            
            <Navbar className="navbar col-sm-auto" dark expand='md'>
                   <div className="mt-2">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <NavbarBrand className="mr-auto mt-auto mb-auto" href="/">
                        <h6>Pharmacy Absolute Care</h6>
                        
                    </NavbarBrand>
                    </div>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <div className="container ml-0 " float="left">
                        <Nav navbar   className="ml-0" >
                            
                                <NavLink className='nav-link ' to='/home'>
                                    <span ></span> Home
                                </NavLink>
                            
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span ></span> About Us
                                </NavLink>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret disabled>
                                        <span className="mr-2">Products</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                    <NavLink to='/catalogue/'>
                                        <MDBDropdownItem>All</MDBDropdownItem>
                                    </NavLink>
                                        {categoryDropDown}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                               
          
                                <NavLink className='nav-link' to='/contactus'>
                                    <span ></span> Contact Us
                                </NavLink>
                               
                            
                        </Nav>
                        </div>
                        <div className="container col-auto mr-auto " float="right">
                        <Nav className="nav navbar-nav navbar-right">
                            <NavLink className='nav-link mt-auto mb-auto' style={{width:"40px"}}to='/cart'>
                                <div className={styles.navbar__cart}>
                            <span className="fa fa-shopping-cart fa-lg"><div className={styles.cart__counter}>{this.cartCounter}</div></span>
                            </div>
                            </NavLink>
                            <NavItem className='nav-link' onClick={this.toggleRegModal} float="right">
                                <Button className="teal lighten-1" style={{padding:"8px 32px"}}>
                                <span className="fa fa-user-plus"></span> Sign Up
                                </Button>
                            </NavItem>
                            <NavItem className='nav-link' onClick={this.toggleModal}>
                            <Button className="teal lighten-1" style={{padding:"8px 32px"}}>
                                <span className="fa fa-sign-in"></span> Login
                                </Button>
                            </NavItem>
                            
                        </Nav>
                        </div>
                        
                        </Collapse>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}  >
                        <ModalHeader toggle={this.toggleModal} >Sign In</ModalHeader>
                        <ModalBody>
                            <SignInForm login={this.props.login} toggle={this.toggleModal}  users={this.props.users.users} resetSignInForm={this.props.resetSignInForm}/>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.isRegModalOpen} toggle={this.toggleRegModal}  >
                        <ModalHeader toggle={this.toggleRegModal} >Sign Up</ModalHeader>
                        <ModalBody>
                            <RegisterPage postUser={this.props.postUser}users={this.props.users.users} resetSignUpForm={this.props.resetSignUpForm} toggle={this.toggleRegModal} />
                        </ModalBody>
                    </Modal>
            </Navbar>
            </>
            

        )}
        if(this.props.auth.signed===true && this.props.auth.type===1){return(
            <>
            
            <Navbar className="navbar col-sm-auto" dark expand='md'>
                   <div className="mt-2">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <NavbarBrand className="mr-auto mt-auto mb-auto" href="/">
                        <h6>Pharmacy Absolute Care</h6>
                        
                    </NavbarBrand>
                    </div>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <div className="container ml-0 " float="left">
                        <Nav navbar   className="ml-0" >
                            
                                <NavLink className='nav-link ' to='/home'>
                                    <span ></span> Home
                                </NavLink>
                            
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span ></span> About Us
                                </NavLink>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret disabled>
                                        <span className="mr-2">Products</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                    <NavLink to='/catalogue/'>
                                        <MDBDropdownItem>All</MDBDropdownItem>
                                    </NavLink>
                                        {categoryDropDown}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                               
          
                                <NavLink className='nav-link' to='/contactus'>
                                    <span ></span> Contact Us
                                </NavLink>
                                <NavLink className='nav-link' to='/admin'>
                                    <span ></span> Admin
                                </NavLink>
                            
                        </Nav>
                        </div>
                        <div className="container col-auto mr-auto " float="right">
                        <Nav className="nav navbar-nav navbar-right">
                            <NavLink className='nav-link mt-auto mb-auto' style={{width:"40px"}}to='/cart'>
                                <div className={styles.navbar__cart}>
                            <span className="fa fa-shopping-cart fa-lg"><div className={styles.cart__counter}>{this.cartCounter}</div></span>
                            </div>
                            </NavLink>
                            <NavItem className='nav-link' onClick={this.toggleLogoutModal} float="right">
                                <Button className="teal lighten-1" style={{padding:"8px 32px"}}>
                                <span className="fa fa-sign-out"></span> Log Out
                                </Button>
                            </NavItem>
                            <Modal isOpen={this.state.isLogoutModalOpen} toggle={this.toggleLogoutModal}  >
                        <ModalHeader toggle={this.toggleLogoutModal} >Are you sure you want to Logout?</ModalHeader>
                        <ModalBody>
                            <Row>
                            <Link className=" col-sm-auto col-md-5 ml-auto mr-auto  " to="/home" >
                        <Button  className=" teal accent-4 col-md-12 ml-auto mr-auto" onClick={this.ConfirmLogout}>Yes</Button>
                        </Link>
                        <div className=" col-sm-auto col-md-5 ml-auto mr-auto" >
                        <Button className=" teal accent-4 col-md-12 ml-auto mr-auto "  onClick={this.toggleLogoutModal}>No</Button>
                        </div>
                        </Row>
                        </ModalBody>
                        </Modal>
                            
                            
                        </Nav>
                        </div>
                        
                        </Collapse>
                   
            </Navbar>
            </>
            

        )}
        if(this.props.auth.signed===true){return(
            <>
            
            <Navbar className="navbar col-sm-auto" dark expand='md'>
                   <div className="mt-2">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <NavbarBrand className="mr-auto mt-auto mb-auto" href="/">
                        <h6>Pharmacy Absolute Care</h6>
                        
                    </NavbarBrand>
                    </div>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <div className="container ml-0 " float="left">
                        <Nav navbar   className="ml-0" >
                            
                                <NavLink className='nav-link ' to='/home'>
                                    <span ></span> Home
                                </NavLink>
                            
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span ></span> About Us
                                </NavLink>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret disabled>
                                        <span className="mr-2">Products</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                    <NavLink to='/catalogue/'>
                                        <MDBDropdownItem>All</MDBDropdownItem>
                                    </NavLink>
                                        {categoryDropDown}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                               
          
                                <NavLink className='nav-link' to='/contactus'>
                                    <span ></span> Contact Us
                                </NavLink>
                               
                            
                        </Nav>
                        </div>
                        <div className="container col-auto mr-auto " float="right">
                        <Nav className="nav navbar-nav navbar-right">
                            <NavLink className='nav-link mt-auto mb-auto' style={{width:"40px"}}to='/cart'>
                                <div className={styles.navbar__cart}>
                            <span className="fa fa-shopping-cart fa-lg"><div className={styles.cart__counter}>{this.cartCounter}</div></span>
                            </div>
                            </NavLink>
                            <NavItem className='nav-link' onClick={this.toggleLogoutModal} float="right">
                                <Button className="teal lighten-1" style={{padding:"8px 32px"}}>
                                <span className="fa fa-sign-out"></span> Log Out
                                </Button>
                            </NavItem>
                            <Modal isOpen={this.state.isLogoutModalOpen} toggle={this.toggleLogoutModal}  >
                        <ModalHeader toggle={this.toggleLogoutModal} >Are you sure you want to Logout?</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Link className=" col-sm-auto col-md-5 ml-auto mr-auto  " to="/home" >
                        <Button  className=" teal accent-4 col-md-12 ml-auto mr-auto" onClick={this.ConfirmLogout}>Yes</Button>
                        </Link>
                        <div className=" col-sm-auto col-md-5 ml-auto mr-auto" >
                        <Button className=" teal accent-4 col-md-12 ml-auto mr-auto "  onClick={this.toggleLogoutModal}>No</Button>
                        </div>
                        </Row>
                        </ModalBody>
                        </Modal>
                            
                            
                        </Nav>
                        </div>
                        
                        </Collapse>
                   
            </Navbar>
            </>
            

        )}
    }
}
export default NavBar;
