import React, { Component } from "react";
import axios from "axios";
import { getUser } from ".././Utils/Common";
import { Link } from "react-router-dom";

const user = getUser();

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      totalConn: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    if (user.length !== 0) {
      const id = user.id;
      const url = `https://teenivoapi.herokuapp.com/accounts/profilesId/${id}`;
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
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="myprofile">
        <div className="profile-imgs">
          <img
            className="background-img"
            src={users.background_photo}
            alt="background of user"
          ></img>
          <img
            className="profile-img"
            src={users.header_photo}
            alt="profie of user"
          ></img>
          <div className="user-info edit-profile">
            <ul className="flex-1">
              <li>
                {user.first_name} {user.last_name}
              </li>
            </ul>
            <h2 className="headline">{users.headline}</h2>
            <ul className="list">
              <li className="inline-block">
                {users.city}, {users.state}, {users.country}
              </li>
              <li className="inline-block">
                <Link to="/connections">{totalConn} Connections</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="block mtb">
          <div className="">
            <header className="justify-space-between">
              <h2 className="inline-block t-20">Summary</h2>
            </header>
            <div>{users.summary_text}</div>
          </div>
        </div>
        <div className="block mtb">
          <div className="">
            <header className="justify-space-between">
              <h2 className="inline-block t-20">About</h2>
            </header>
            <div>{users.about_profile}</div>
          </div>
        </div>
        <div className="block mtb">
          <div className="">
            <header className="justify-space-between">
              <h2 className="inline-block t-20">Skills</h2>
            </header>
            <div>{users.skills}</div>
          </div>
        </div>
      </div>
    );
  }
}
