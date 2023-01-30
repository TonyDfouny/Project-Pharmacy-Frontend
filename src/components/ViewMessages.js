import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle} from "reactstrap";
import { baseUrl } from '../shared/baseUrl';
class ViewMessagesC extends Component{
    
    render(){
        return(
        <Card  elevation={5} className="col-sm-auto col-md-2 m-4" >
            <Link to="/messages">
                <CardImg className="mt-2" style={{width:"sm-100px md-350px",height:"sm-100px md-350px"}} src={baseUrl+"/images/message.png"} alt="View Your Messages" />
                </Link>
                <CardBody>
                    <CardTitle style={{"font-size":"medium","font-family": "Verdana"}}>View Your Messages</CardTitle>
                </CardBody>
            </Card>
        )

    }
}
export default ViewMessagesC;