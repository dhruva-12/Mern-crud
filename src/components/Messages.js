import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {  getUser } from "../Utils/Common";
import Image from "./Image";
import axios from "axios";

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
    {friends.map((friend, index) => (
               
    <div className="b" key={index}>
        <div className="card boxx">
        <textarea
                className="message"
                placeholder="Write a Message...."
                id="message"
                name="mssg"
                required
                onChange={this.handleChange}
                rows="4"
              >
                
                </textarea>
                   <div className="card b1">
                <label className="lab" onClick={this.props.handleClick}>Send</label>
                </div>

        </div>
        <div className="card boxx1">
                
        <div className="card boxx2">
          
        

        <p className="fname">{friend.from_user.first_name}&nbsp;{friend.from_user.last_name}</p>
        <Image></Image>

        </div>
        
        </div>
        
        </div>
    ))}
      </div>
        
    );
  }
}


export default Messages