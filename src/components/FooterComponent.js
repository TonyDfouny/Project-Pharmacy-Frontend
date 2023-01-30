import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import{Button} from 'reactstrap';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <MDBFooter  color="teal" className="lighten-1 font-small  pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="my-4">
          <MDBCol md="4" lg="4">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              Pharmacy Absolute Care
            </h5>
            <p>
            A better way to shop for health and beauty!
            </p>
            <p>
            Covid-19 made visiting stores a hard task, long waiting
            queues, missing products and fear of contamination.
            Thats why Pharmacy Absolute Care gives you the possibility
            to shop online with ease.
              {" "}
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="ml-auto">
            <h5 className="text-uppercase mb-4 font-weight-bold">Links</h5>
            <ul className="list-unstyled">
              <p>
                <li><Link to="/home">Home</Link></li>
              </p>
              <p>
                <li><Link to="/aboutus">About Us</Link></li>
              </p>
              <p>
                <li><Link to="/catalogue">Products</Link></li>
              </p>
              <p>
              <li><Link to="/contactus">Contact Us</Link></li>
              </p>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="5" lg="3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>
            <p>
              <i className="fas fa-map-marked-alt mr-3" /> Beirut Souks, BEIRUT, LB.
            </p>
            <p>
              <i className="fas fa-mobile-alt mr-3" /> +961 76/860453
            </p>
            <p>
              <i className="fas fa-mobile-alt mr-3" /> +961 71/098020
            </p>
            <p>
              <i className="fas fa-at mr-3" ></i>: <a href="mailto:PharmacyAbsCare@gmail.com">PharmacyAbsCare@gmail.com</a>
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="text-center">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              Follow us
            </h5>
            <div className="mt-2 ">
            <Button
                className="btn btn-facebook m-1 rounded-circle"
                color="facebook"
                type="button"
                href="http://www.facebook.com/profile.php?id="
                active
            >
                {" "}
                <span className="btn-inner--icon">
                <i className="fab fa-facebook" ></i>
                </span>
            </Button>
            <Button
                className="btn btn-twitter m-1 rounded-circle"
                color="twitter"
                type="button"
                href="http://twitter.com/"
                active
            >
                {" "}
                <span className="btn-inner--icon">
                <i className="fab fa-twitter"></i>
                </span>
            </Button>
            <Button
                className="btn  btn-instagram m-1 rounded-circle"
                color="instagram"
                type="button"
                href="http://instagram.com/"
                active
            >
                {" "}
                <span className="btn-inner--icon">
                <i className="fab fa-instagram"></i>
                </span>
            </Button>
            <Button
                className="btn  btn-google m-1 rounded-circle"
                color="youtube"
                type="button"
                href="http://youtube.com/"
                active
            >
                {" "}
                <span className="btn-inner--icon">
                <i className="fab fa-youtube"></i>
                </span>
            </Button>
            </div>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Pharmacy Absolute Care{" "}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;