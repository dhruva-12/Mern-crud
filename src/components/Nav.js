import React, { Component } from "react";
import home from "../images/home.png";
import people from "../images/people.png";
import trophy from "../images/trophy.png";
import message from "../images/message.png";
import bellicon from "../images/bellicon.png";
import search from "../images/search.png";
import teens from "../images/teenivo-elephant.png";
import { getUser } from "../Utils/Common";
import axios from "axios";

const user = getUser();
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      posts: [],
      users: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    if (user.length !== 0) {
      const id = user.id;
      const url = `http://teenivoapi.herokuapp.com/accounts/profilesId/${id}`;
      axios
        .get(url)
        .then((response) =>
          this.setState({ users: response.data, isLoading: false })
        );
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div className="Navbar">
        <div className="searchbar">
          <img
            className="sep"
            src={users.header_photo}
            alt="profie of user"
          ></img>

          <p className="me">Me</p>

          <input type="text" className="border" placeholder="Search" />
          <img className="search " src={search} alt="search " />

          <img className="teens" src={teens} alt="teens" />
          <img className="home" src={home} alt="home" />

          <img className="people " src={people} alt="people " />
          <img className="bellicon" src={bellicon} alt="bellicon" />
          <img className="trophy" src={trophy} alt="trophy" />
          <img className="message" src={message} alt="message" />
        </div>
      </div>
    );
  }
}

export default Nav;
