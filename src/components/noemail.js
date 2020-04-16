import React, { Component } from "react";
//import { Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class noemail extends Component {
  render() {
    return (
      <div className="container clearfix">
        <form>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <h3>
            <img src="images/teen.jpeg" alt="logo"></img>
          </h3>

          <center>We couldn't trace your teenivo account or profile</center>
          <center>
            <h4>Help us find you</h4>
          </center>

          <div className="inputWithIcon inputIconBg">
            <center>Enter your Email or ProfileId</center>
            <center>
              <input type="text" placeholder="enterdemail@domain.com"></input>
            </center>
          </div>

          {/* <div className="boo">
                <Button style={{width:170,backgroundColor:'#c30003',marginTop:20,}}>
                Locate me
              </Button>
          </div> */}
          <Link to={"/create"}>
            Create Support Ticket(Mobile Phone Required)
          </Link>
        </form>
      </div>
    );
  }
}
