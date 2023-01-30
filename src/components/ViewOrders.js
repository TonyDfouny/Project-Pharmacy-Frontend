import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle} from "reactstrap";
import { baseUrl } from '../shared/baseUrl';
class ViewOrdersC extends Component{
    
    render(){
        return(
        <Card  elevation={5} className="col-sm-auto col-md-2 m-4" >
            <Link to="/orders">
                <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/orders.png"} alt="View The Orders" />
                </Link>
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>View The Orders</CardTitle>
                </CardBody>
            </Card>
        )

    }
}
export default ViewOrdersC;