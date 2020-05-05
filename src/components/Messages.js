import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {  getUser } from "../Utils/Common";
import Image from "./Image";
import axios from "axios";
import mss from "../images/mss.png";
import dots from "../images/dots.png";
import dot from "../images/dot.png";
import send from "../images/send.png";
import filter from "../images/filter.png";
import flag from "../images/flag.png";
import star from "../images/star.png";
import mes from "../images/mes.png";
import { AppBar } from "@material-ui/core";
import SearchName from "./SearchName";

class Messages extends React.Component {
 
    
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      isLoading: false,
      users: [],
      cons:[],
    };
  }
  
  componentDidMount() {
    this.setState({ isLoading: true });
    this._isMounted = true;
    const user = getUser();
    if (user !== null) {
      const id = user.id;
    fetch(`https://teenivoapi.herokuapp.com/addfriend/friend/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({ friends: data, isLoading: false });
        }
      
      });
     
    }

    }







  render() {
    const { friends, isLoading, users } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      
      
      <div className="col-12">
      <AppBar></AppBar>
    {friends.map((friend, index) => (
               
    <div className="b" key={index}>
        <div className="card boxx">
        <img className="dot" src={dot} alt="dot" />
        <SearchName/>
  
       

       
                
                <img className="send" src={send} alt="send" />
                <p className="newmessage">New Message</p>
               
              
        <textarea
                className="message"
                placeholder="Write a Message...."
                id="textMessage"
                name="mssg"
                required
                //onChange={this.handleChange}
                onKeyDown={this.onKeyPressed}
                rows="4"
              />


            <div className="inp">

               <img className="mes" src={mes} alt="message" />
               <img className="flag" src={flag} alt="flag" />
               <img className="star" src={star} alt="star" />
              </div>











                   <div className=" b1">
                <label className="lab">Send</label>

                
                </div> 
                <img className="dots" src={dots} alt="dots" />

        </div>
        <div className="card boxx1">

        <img className="mss" src={mss} alt="message" />
        <img className="dots" src={dots} alt="dots" />
        <strong className="word">Messaging</strong>
        <div class="h-divider">
        </div>
        <input type="text" className="bord" placeholder="Search Messages" />
        <img className="filter" src={filter} alt="filter" />
        <div class="h-divide">
        </div>
        <div className="card boxx2">
          
        <div class=" col-md-2">
  <ul class="nav nav-pills nav-stacked anyClass">
    <li class="nav-item">
        <p className="fname">{friend.from_user.first_name}&nbsp;{friend.from_user.last_name}</p>

        </li>
        <Image></Image>

        </ul>
        </div>
        </div>
        </div>
        </div>
    ))}
      </div>
        
    );
  }
}


export default Messages