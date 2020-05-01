import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  getUser } from "../Utils/Common";
import axios from "axios";

export default class Messages extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      users: [],
      isLoading: false,
     
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
              <div className="card" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{friend.from_user.first_name}</h5>
                 
                  
                  
                  
                </div>
              </div>
            ))}
          </div>
        
    );
  }
}
