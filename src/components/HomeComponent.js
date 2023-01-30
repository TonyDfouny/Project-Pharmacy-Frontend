import {MDBCol, MDBIcon, MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import React from 'react';
import {baseUrl} from '../shared/baseUrl';

function Home(){
    return(
        <div>
        <MDBContainer className="m-5 mr-auto ml-auto">
        <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src={baseUrl+"/images/JumbotronBg.png"}
                alt="First slide"
              />
            <MDBMask />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Our Mobile App is coming soon... Stay Tuned!</h3>
              
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src={baseUrl+"/images/Vaccine.png"}
                alt="Second slide"
              />
            <MDBMask />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Get Vaccinated!</h3>
              
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src={baseUrl+"/images/Home.png"}
                alt="Third slide"
              />
            <MDBMask overlay="black-slight" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">Shop all your pharmacy supplies online</h3>
              
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      </MDBContainer>
      
        <div className="container col-3 mb-5 mt-5   ">
            <MDBCol >
                    <MDBIcon icon="money-bill" size="3x" />
                    <h5 className="font-weight-bold mb-3">Pay by cash on Delivery </h5>
                </MDBCol>
        </div>
        <div className='container col-3 mb-5 mt-5'>
            <MDBCol >
              <MDBIcon icon="shopping-cart" size="3x" style={{justifyContent:"center"}}/>
            
              <h5 className="font-weight-bold mb-3">Wide variety of products</h5>
            </MDBCol>
          
        </div>
        <div className='container col-3 mb5 mt-5'>
            <MDBCol size="auto">
              <MDBIcon icon="bicycle" size="3x" />
            
              <h5 className="font-weight-bold mb-3">Fitness
                    supplements</h5>
            </MDBCol>
        </div>
                   
    </div>  
    


    );
}
export default Home;