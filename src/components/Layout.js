import React, { Component } from "react";

import Leftp from "./Leftp";
import Midp from "./Midp";
import Rightp from "./Rightp";
import { getUser } from "../Utils/Common";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const user = getUser();

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      posts: [],
      users: [],
      isLoading: false,
      friend_post: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    if (user.length !== 0) {
      const id = user.id;
      const url = `http://teenivoapi.herokuapp.com/accounts/profiles/${id}`;
      axios
        .get(url)
        .then((response) =>
          this.setState({ users: response.data, isLoading: false })
        );
      axios
        .get(`http://teenivoapi.herokuapp.com/addfriend/friend/${id}`)
        .then((response) =>
          this.setState({ totalConn: response.data.length, isLoading: false })
        );
    }
  }
  render() {
    const { isLoading, users, totalConn } = this.state;

    return (
      <>
        <div className="common">
          <Leftp></Leftp>
          <Midp></Midp>
          <Rightp></Rightp>
          <Nav></Nav>
          <Footer></Footer>
        </div>
      </>
    );
  }
}

export default Layout;
