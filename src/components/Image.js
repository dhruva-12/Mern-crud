import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {  getUser } from "../Utils/Common";

import axios from "axios";

class Image extends React.Component {
 
    
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
    fetch(`https://teenivoapi.herokuapp.com/addfriend/friendProfile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({ cons: data, isLoading: false });
        }
      
      });
      
    }

    }



 
  render() {
    const { cons, isLoading, users } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
     
        
        <div className="col-12">
    {cons.map((con, index) => (
        <img  src={con.header_photo}  className="card-img-top cir" />

        
    
    ))}
      </div>
        
    );
  }
}


export default Image