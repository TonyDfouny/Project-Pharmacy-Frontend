import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle} from "reactstrap";
import { baseUrl } from '../shared/baseUrl';
class ViewUsersC extends Component{
    
    render(){
        return(
        <Card  elevation={5} className="col-sm-auto col-md-2 m-4" >
            <Link to="/users">
                <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/ViewUsers.png"} alt="View All Users" />
                </Link>
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>View All Users</CardTitle>
                </CardBody>
            </Card>
        )

    }
}
export default ViewUsersC;