import React, { Component } from "react";
import { getUser } from "../Utils/Common";
import axios from "axios";

const user = getUser();
class Leftp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      users: [],
      isLoading: false,
      friend_post: [],
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
      axios
        .get(`http://teenivoapi.herokuapp.com/addfriend/friend/${id}`)
        .then((response) =>
          this.setState({ totalConn: response.data.length, isLoading: false })
        );
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div className="box">
        <div className="canvas">
          <img
            src={users.header_photo}
            className="photo"
            alt="profile of user"
          ></img>
           <img
            src={users.background_photo}
            className="photo1"
            alt="background photo of user"
          ></img>
        </div>
        <div className="midbox">
          <label className="text">
            {user.first_name}&nbsp;{user.last_name}
          </label>
          <p className="text1 text-center">{users.headline}</p>
          <div class="lines"></div>
          <p className="text2">Member Since: April 2020</p>
          <p className="text3">Invited By: </p>
          <div class="line1"></div>
          <p className="text4">Student Account: Free</p>
          <div class="button">Upgrade</div>
        </div>
        <div className="subbox">
          <p className="pv">Profile Views: </p>
          <p className="con">Connections: </p>
          <p className="sty">Invite Friends</p>
        </div>
      </div>
    );
  }
}

export default Leftp;
