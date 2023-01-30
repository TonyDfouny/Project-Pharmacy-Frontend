import React from 'react';
import { MDBCardGroup,MDBTypography, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {baseUrl} from "../shared/baseUrl";

function AboutUs(){
    return(
    <div>
        <MDBTypography className="m-2"tag='h1'>About Us</MDBTypography>
        <p className="m-2">
        We deliver the best care. A better way to shop for health & beauty. Healthcare for life. A pharmacy your family can trust.
        </p>
        <MDBCardGroup column="auto">
          <div className="col-auto m-2">
      <MDBCard >
        <MDBCardImage style={{width:"auto",height:"300px"}} src={baseUrl+"images/Store.png"} alt="MDBCard image cap" top hover
          overlay="white-slight" />
        <MDBCardBody>
          <MDBCardTitle tag="h5">Locally Owned</MDBCardTitle>
          <MDBCardText>
          Serving the community since 1980.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
      </div>

      <div className=" col-auto m-2">
      <MDBCard >
        <MDBCardImage style={{width:"370px",height:"300px"}} src={baseUrl+"/images/Delivery.png"} alt="MDBCard image cap" top hover
          overlay="white-slight" />
        <MDBCardBody>
          <MDBCardTitle tag="h5">Home Delivery</MDBCardTitle>
          <MDBCardText>
          Available for medical equipment.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
      </div>
      <div className="col-auto m-2">
      <MDBCard >
        <MDBCardImage style={{width:"300px",height:"300px"}} src={baseUrl+"/images/Call.png"} alt="MDBCard image cap" top hover
          overlay="white-slight" />
        <MDBCardBody>
          <MDBCardTitle tag="h5">Personalized Care</MDBCardTitle>
          <MDBCardText>
            When you call, you speak to a person.
          </MDBCardText>
          
        </MDBCardBody>
      </MDBCard>
      </div>
    </MDBCardGroup>
        <div className="m-4">
          <hr/>
          <MDBTypography className="m-2 text-center" tag='h3'>Opening Hours:</MDBTypography>
        </div>  
        <MDBTable>
      <MDBTableHead  color="dark">
        <tr>
          <th>Day</th>
          <th>Working Hours</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>Monday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>8am-8pm</td>
        </tr>
        <tr>
          <td>Sunday</td>
          <td>8am-4pm</td>
        </tr>
        
                </MDBTableBody>
            </MDBTable>
            
        </div>
    )
  }



    
export default AboutUs;