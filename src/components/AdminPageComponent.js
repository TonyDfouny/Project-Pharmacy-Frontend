
import AddCategoryC from "./AddCategoryComponent";
import React,{Component} from "react";
import AddProductC from "./AddProductComponent";
import DeleteCategoryC from "./DeleteCategoryComponent";
import DeleteProductC from "./DeleteProductComponent";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import ViewMessagesC from "./ViewMessages";
import { Link } from "react-router-dom";
import ViewOrdersC from "./ViewOrders";
import AdjustProductQttyC from "./AdjustProductQttyComponent";
import { Loading } from "./LoadingComponent";
import ViewUsersC from "./ViewUsers";
import AdjustProductPriceC from "./AdjustPrice";



class AdminPage extends Component{
    render(){
        if (this.props.productsLoading){
            return(
                <div className='container'>
                    <div className='row'>
                    <Loading></Loading>
                       
                    </div>
                </div>)
      
        }
        else if(this.props.productsErrMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{this.props.productsErrMess}</h4>
                    </div>
      
                </div>
            )
        }
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
        return(
        <div>
        <Row className="ml-2">
        <AddProductC className="col-md-3 m-2" categories={this.props.categories}
            products={this.props.products} 
            postProduct={this.props.postProduct} resetProductForm={this.props.resetProductForm}/>
        <AddCategoryC className="col-md-3 m-2"resetCategoryForm={this.props.resetCategoryForm} postCategory={this.props.postCategory}
         categories={this.props.categories}/>
         <AdjustProductQttyC className="col-md-3 m-2"products={this.props.products} resetQttyForm={this.props.resetQttyForm} putProduct={this.props.putProduct}/>
        <AdjustProductPriceC className="col-md-3 m-2"products={this.props.products} resetPriceForm={this.props.resetPriceForm} putProduct={this.props.putProduct}/>
      <DeleteProductC className="col-md-3 m-2" products={this.props.products} resetDeleteProductForm={this.props.resetDeleteProductForm} deleteProduct={ this.props.deleteProduct}/>
      <DeleteCategoryC className="col-md-3 m-2"categories={this.props.categories} products={this.props.products} deleteCategory={this.props.deleteCategory} deleteProduct={ this.props.deleteProduct} resetDeleteCategoryForm={this.props.resetDeleteCategoryForm} />
      <ViewMessagesC className="col-md-3 m-2"/>
      <ViewOrdersC className="col-md-3 m-2"/>
      <ViewUsersC className="col-md-3 m-2"/>
      </Row></div>);
    }
}
export default AdminPage;

