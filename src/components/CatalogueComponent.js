import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Link } from 'react-router-dom';
import {Card,CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem, Row} from 'reactstrap';
import {Loading} from './LoadingComponent';

    
    function RenderCatalogueItem({ product,categ,isLoading,errMess,add}){
        console.log(product._id);
        const category=(categ.filter((cat)=>cat._id===product.category)[0]);
        if (isLoading){
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
        return(<>
            
              <Card  elevation={5}>
                
                <CardImg className="mt-2"width="100%"  src={product.image} alt={product.name} />
                <CardBody >
                    <CardTitle style={{"font-size":"medium"}}>{product.name}</CardTitle>
                    <CardText>{category.description}</CardText>
                    <div className="text-center">
                        <Row>
                    <MDBBtn    className=" teal accent-4 ml-auto mr-auto " onClick={()=>add(product._id)}style={{width:"150px"}} position="absolute">Add To Cart</MDBBtn>
                    <Link to={`/catalogue/${category._id}/${product._id}`} >  
                    <MDBBtn   className=" teal accent-4 ml-auto mr-auto " style={{width:"150px"}} position="absolute" >See Details</MDBBtn>
                    </Link>
                    </Row>
                    
                    </div>
                </CardBody>
            </Card></>); 
    };  
    const Catalogue =(props)=>{
        const menu=props.products.map((product)=>{
            return(
                <div key={product._id} className="col-12 col-md-3 m-4 ">
                <RenderCatalogueItem product={product} categ={props.categ}  add={props.add}isLoading={props.productsLoading} errMess={props.productsErrMess} />
                </div>
            )

        });
        if(props.products.length===0 || props.categ.length===0){

            return(
                <div></div>
            )
        }
        if (props.productsLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>)

        }
        else if(props.productsErrMess){
            return(
                <div className='container'>
                    <div className="row">
                        <h4>{props.productsErrMess}</h4>
                    </div>

                </div>
            )
        }
        else if (props.categ.length===1){
            
            return(
                <div className="container">
                <div className="row">
                <div className='container col-sm-6 ml-0 mt-2'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active >Products{`> ${(props.categ[0]).description}`}</BreadcrumbItem>
                    </Breadcrumb></div>
                    <div className="col-12">
                        <h3>Products</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                </div>
            </div>

        );};

       
     return(
                <div className="container">
                    <div className="row">
                    <div className='container col-sm-6 ml-0 mt-2'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Products{'>'} All </BreadcrumbItem>
                        </Breadcrumb>
                        </div>
                        <div className="col-12">
                            <h3>Products</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <div className="row">
                    </div>
                </div>

            );
    }

export default Catalogue;