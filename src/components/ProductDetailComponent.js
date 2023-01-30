import React from 'react';
import {Card,CardImg,CardBody,CardTitle,CardSubtitle,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import { Link } from 'react-router-dom';
import "../App.css";
import {Loading} from "./LoadingComponent";
import { MDBBtn } from 'mdbreact';


     function RenderProductImage({product,categ,isLoading,errMess,add}){
        if(isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>)

        }
        else if(errMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{errMess}</h4>
                    </div>

                </div>
            )
        }
        else if(product!=null){
            return(<>
            
                <div className="col-md-6 col-lg-5 mt-4 ml-4">
                <Card >
                    <CardImg width="100%"  src={product.image} alt={product.name} />
                    <CardTitle className="m-1">{product.name}</CardTitle>
                    <CardSubtitle className="m-1">{categ.description}</CardSubtitle>
                    <MDBBtn    className=" teal accent-4 mt-4 ml-auto mr-auto " onClick={()=>add(product._id)}style={{width:"150px"}} position="absolute">Add To Cart</MDBBtn>
                </Card>
                </div>
                </>
                
            );

        }
        else{
            <div></div>
        }
    }
    function RenderProductDetail({product,isLoading,errMess}){
        if(isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>)

        }
        else if(errMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{errMess}</h4>
                    </div>

                </div>
            )
        }
        else if (product!=null){
            
            return(
                <div className='col-md-6 col-lg-6 m-4'>
                    <Card>
                        <CardBody>
                            <CardTitle>{product.name}</CardTitle>
                            <p className="desc">Description:</p>
                            <p>{product.description}</p>
                            <p className="desc">Application:</p>
                            <p>{product.application}</p>
                        
                            <p className="desc">Price:</p>
                            <p>{product.price} $</p>
                           
                            <p className="desc">Quantity in stock:</p>
                            <p>{product.quantity}</p>
                        {/*<CardText>{product.description}</CardText>*/}
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
    const ProductDetail=(props)=>{
        const product=props.product;
        console.log(product);
        const categ=props.categ;
        if(props.isLoading){
            return(
                <div className='container  col-md-12'>
                    <div className='row  '>
                        <Loading/>
                    </div>
                </div>)
            
        }
        else if(props.errMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>

                </div>
            )
        }
        /* const DivToScroll=React.createRef(); */
        
       
         
       /*  useEffect(()=>{
            if(DivToScroll.current){
                DivToScroll.current.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "nearest"
                 })}
        })
        if (product == null) {
            return (<div></div>);
        } */
        

        /* const ProductImage =RenderProductImage(product,categ);
        const ProductDetail=RenderProductDetail(product); */
        return (
            <div className='container'>
                <div className="row">
                <div className='container col-sm-6 ml-0 mt-2'>
                     <Breadcrumb>

                        <BreadcrumbItem><Link to={`/catalogue/${categ._id}`}>Products{'>'} {categ.description}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{product.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{product.name}</h3>
                        <hr />
                    </div>                
                </div>
                 
                <div className='row'>
                <RenderProductImage product={product} add={props.add} categ={categ} isLoading={props.isLoading} errMess={props.errMess}/>
                <RenderProductDetail product={product} isLoading={props.isLoading} errMess={props.errMess}/>
                </div>
            </div>
            
        )
    }

export default ProductDetail;


