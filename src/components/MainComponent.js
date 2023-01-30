
import AboutUs from './AboutUs';
import { Component } from 'react';
import Home from './HomeComponent';
import Catalogue from './CatalogueComponent';
import AdminPage from './AdminPageComponent';
import ProductDetail from './ProductDetailComponent';
import NavBar from "./NavbarComponent";
import Footer from './FooterComponent';
import Contact from "./ContactComponent";
import {Switch,Route,Redirect,useParams, withRouter} from'react-router-dom';
import {connect} from 'react-redux';
import { postProduct ,fetchProducts,fetchCategories,fetchUsers
  ,postCategory,deleteProduct,deleteCategory, addToCart,removeFromCart,adjust_qty, 
  postMessage, fetchMessages, deleteMessage, postUser, login, logout, postOrder, fetchOrders, 
  postProdOrder, fetchProdOrders, deleteProdOrder, deleteOrder, putProduct, putUser} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Cart from './CartComponent';
import AllMessages from './MessagesComponent';
import Checkout from './CheckoutComponent';
import OrdersC from './Orders';
import OrderDetails from './OrderDetail';
import UserComponent from './UsersComponent';


const mapStateToProps=state=>{
  return {
    products: state.products,
    categories: state.categories,
    users: state.users,
    messages: state.messages,
    auth:state.auth,
    orders:state.orders,
    prodOrder:state.prodOrder
  }
}
const mapDispatchToProps=(dispatch)=>({
  putUser:(id,firstName,lastName,password,email,telnum,date)=>{dispatch(putUser(id,firstName,lastName,password,email,telnum,date))},
  putProduct:(id,productName,category,description,application,quantity,price,image)=> dispatch(putProduct(id,productName,category,description,application,quantity,price,image)),
  postMessage:(firstName,lastName,telnum,email,flag,contactMethod,message)=>{dispatch(postMessage(firstName,lastName,telnum,email,flag,contactMethod,message))},
  postProduct:(productName,category,description,application,quantity,price,image)=> dispatch(postProduct(productName,category,description,application,quantity,price,image)),
  postCategory:(categoryName)=> dispatch(postCategory(categoryName)),
  postOrder:(userId,city,details,floor,contactMethod,addComments,totalPrice)=>{dispatch(postOrder(userId,city,details,floor,contactMethod,addComments,totalPrice))},
  postUser:(firstName,lastName,password,email,telnum,date)=>{dispatch(postUser(firstName,lastName,password,email,telnum,date))},
  postProdOrder:(orderId,productId,productPrice,quantity)=>{dispatch(postProdOrder(orderId,productId,productPrice,quantity))},
  fetchProducts: () => { dispatch(fetchProducts())},
  fetchCategories: () => { dispatch(fetchCategories())},
  fetchUsers: () => { dispatch(fetchUsers())},
  fetchMessages:()=>{dispatch(fetchMessages())},
  fetchOrders:()=>{dispatch(fetchOrders())},
  fetchProdOrders:()=>{dispatch(fetchProdOrders())},
  deleteProduct:(productId)=>{dispatch(deleteProduct(productId))},
  deleteCategory:(categoryId)=>{dispatch(deleteCategory(categoryId))},
  deleteMessage:(messageId)=>{dispatch(deleteMessage(messageId))},
  deleteProdOrder:(prodOrderId)=>{dispatch(deleteProdOrder(prodOrderId))},
  deleteOrder:(orderId)=>{dispatch(deleteOrder(orderId))},
  login:(user)=>{dispatch(login(user))},
  logout:()=>{dispatch(logout())},
  addToCart:(productId)=>{dispatch(addToCart(productId))},
  removeFromCart:(productId)=>{dispatch(removeFromCart(productId))},
  adjust_qty:(productId,value)=>{dispatch(adjust_qty(productId,value))},
  resetMessageForm:()=>{dispatch(actions.reset('message'))},
  resetCategoryForm:()=>{dispatch(actions.reset('category'))},
  resetProductForm:()=>{dispatch(actions.reset('product'))},
  resetDeleteCategoryForm:()=>{dispatch(actions.reset('dcategory'))},
  resetDeleteProductForm:()=>{dispatch(actions.reset('dproduct'))},
  resetSignUpForm:()=>{dispatch(actions.reset('signup'))},
  resetSignInForm:()=>{dispatch(actions.reset('signin'))},
  resetCheckoutForm:()=>{dispatch(actions.reset('checkout'))},
  resetQttyForm:()=>{dispatch(actions.reset('adjustqtty'))},
  resetPriceForm:()=>{dispatch(actions.reset('adjustprice'))}
});
class Main extends Component {
 
  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchUsers();
    this.props.fetchMessages();
    this.props.fetchOrders();
    this.props.fetchProdOrders();
    
    
   
    
  }

 
  render() {
    const HomePage=()=>{
      return(
        <Home/>
      );
    }
    const ProductByCategory=()=>{
      let {catId}=useParams();
      const cat=this.props.categories.categories.filter((categ)=>categ._id===(catId));
      //return(<div></div>)
      //alert(cat)
      return(
        <>
        <Catalogue add={this.props.addToCart} products={this.props.products.products.filter((product)=>product.category===cat[0]._id)} categ={cat}
          productsLoading={this.props.products.isLoading}
          productsErrMess={this.props.products.errMess}
          categoriesLoading={this.props.categories.isLoading}
          categoriesErrMess={this.props.categories.errMess}
           />
        </>

      );

    } 
    const OrderWithId=()=>{
      let {OrderId}=useParams();
      
      let order=this.props.orders.orders.filter((order)=>order._id===(OrderId))[0];
      let productsOrder=this.props.prodOrder.prodOrder.filter((prodorder)=>prodorder.orderId===(OrderId))

      //const cat=this.props.categories.categories.filter((categ)=>categ._id===parseInt(catId,10));
      return(
        <>
        <OrderDetails  auth={this.props.auth} productsLoading={this.props.products.isLoading}
          productsErrMess={this.props.products.errMess} order={order} isLoading={this.props.orders.isLoading} errMess={this.props.orders.errMess}
         productsOrder={productsOrder} products={this.props.products.products}
         deleteOrder={this.props.deleteOrder} deleteProdOrder={this.props.deleteProdOrder} putProduct={this.props.putProduct}/>
           
        </>

      );

    } 
    const ProductWithId=()=>{
      let {catId,productId}=useParams();
      const cat=this.props.categories.categories.filter((categ)=>categ._id===(catId))[0];
      const product=this.props.products.products.filter((product)=>product._id===(productId))[0];
      return(
        <>
        <ProductDetail product={product} categ={cat} add={this.props.addToCart} 
          isLoading={this.props.products.isLoading}
          ErrMess={this.props.products.errMess}
          categoriesLoading={this.props.categories.isLoading}
          categoriesErrMess={this.props.categories.errMess}
          />
        </>

      );

    } 
    const AboutPage=()=>{
      return(
        <AboutUs/>
      );}
      if(this.props.categories.isLoading){
        return(
            <div className='container m-2'>
              <div className='row'>
                <img src={baseUrl+'/images/loadingImg.png'} className="ml-auto mr-auto"style={{width:"600px",height:"auto"}} alt="Your Page Is loading"/>
              </div>
                <div className='row mt-4'>
                    <Loading/>
                </div>
            </div>)

    }
    else if(this.props.categories.errMess){
        return(
            <div className='container'>
                <div className="row">
                    <h4>{this.props.categories.errMess}</h4>
                </div>

            </div>
        )
    }
    return (
      
      
      <div className="col-sm-full">
        <NavBar className="col-sm-full ml-2" categories={this.props.categories.categories} users={this.props.users} cart={this.props.products.cart}
        categoriesLoading={this.props.categories.isLoading}
        categoriesErrMess={this.props.categories.errMess}
        resetSignUpForm={this.props.resetSignUpForm}
        resetSignInForm={this.props.resetSignInForm}
        postUser={this.props.postUser}
        login={this.props.login} logout={this.props.logout}
        auth={this.props.auth}/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/cart" >
            <Cart auth={this.props.auth} cart={this.props.products.cart} removeFromCart={this.props.removeFromCart} adjust_qty={this.props.adjust_qty}></Cart>  
          </Route>
          <Route path="/messages" >
            <AllMessages  auth={this.props.auth}messages={this.props.messages.messages} isLoading={this.props.messages.isLoading}
            errMess={this.props.messages.errMess} deleteMessage={this.props.deleteMessage}></AllMessages>  
          </Route>
          <Route path="/users" >
            <UserComponent auth={this.props.auth}putUser={this.props.putUser} users={this.props.users} ></UserComponent>
          </Route>
          <Route exact path="/orders" >
            <OrdersC auth={this.props.auth} orders={this.props.orders.orders} isLoading={this.props.orders.isLoading}
            errMess={this.props.orders.errMess} />  
          </Route>
          <Route exact path="/orders/:OrderId" >
            <OrderWithId />
          </Route>
          <Route exact path='/catalogue'>
          <Catalogue products={this.props.products.products} categ={this.props.categories.categories}
            productsLoading={this.props.products.isLoading}
            productsErrMess={this.props.products.errMess}
            add={this.props.addToCart}
            categoriesLoading={this.props.categories.isLoading}
            categoriesErrMess={this.props.categories.errMess}
            />
            
            </Route>
          <Route exact path='/catalogue/:catId' >
            <div>
            <ProductByCategory/>
            </div>
          </Route>
          <Route exact path='/catalogue/:catId/:productId'>
            <ProductWithId/>
          </Route>
          <Route exact path="/contactus">
           <Contact resetMessageForm={this.props.resetMessageForm} postMessage={this.props.postMessage}/> 
          </Route>
          <Route exact path="/checkout">
          <Checkout  fetchOrders={this.props.fetchOrders}postProdOrder={this.props.postProdOrder} 
          orders={this.props.orders} removeFromCart={this.props.removeFromCart}
           resetCheckoutForm={this.props.resetCheckoutForm} postOrder={this.props.postOrder} 
           auth={this.props.auth} cart={this.props.products.cart}  ordersLoading={this.props.orders.isLoading}
           ordersErrMess={this.props.orders.errMess}/>
          </Route>
          <Route exact path="/admin">
            <AdminPage auth={this.props.auth} categories={this.props.categories.categories} deleteCategory={this.props.deleteCategory} resetDeleteCategoryForm={this.props.resetDeleteCategoryForm}
            products={this.props.products.products} postCategory={this.props.postCategory} resetCategoryForm={this.props.resetCategoryForm}
            postProduct={this.props.postProduct} productsLoading={this.props.products.isLoading} productsErrMess={this.props.products.errMess}
             addCategory={this.props.addCategory} resetProductForm={this.props.resetProductForm}
            resetDeleteProductForm={this.props.resetDeleteProductForm} resetQttyForm={this.props.resetQttyForm} resetPriceForm={this.props.resetPriceForm} putProduct={this.props.putProduct} deleteProduct={ this.props.deleteProduct}/>
          </Route>
          <Route path="/aboutus" component={AboutPage}/>
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
