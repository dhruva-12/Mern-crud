import { getToken, removeUserSession, setUser, getUser } from "../Utils/Common";
import React, { Component } from "react";
import close from "../images/close.png";

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <textarea
                className="popup_inner"
                placeholder="Write your thoughts"
                id="headline"
                name="Headline"
                required
                onChange={this.handleChange}
                rows="8"
              >
                
                </textarea>
         
          <div className="co">
            
          </div>
          <img className="close" src={close} onClick={this.props.closePopup} alt="close" />
        
        <button className="position" onClick={this.props.post}>Post</button>
        
      </div>
    );
  }
}

export default Popup;