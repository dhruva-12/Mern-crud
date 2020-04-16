import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Utils/Common";
import Popup from "reactjs-popup";

const u = getUser();
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: [],
      isLoading: false,
      totalConn: null,
      totalFollowers: null,
      isSent: false,
      isFollow: "Follow",
      isBlock: "Block",
      isFriend: false,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    const {
      match: { params },
    } = this.props;
    //console.log(params.id);
    const url = `http://127.0.01.:8000/accounts/profilesId/${params.user_id}`;
    axios.get(url).then((response) =>
      this.setState({
        users: response.data,
        user: response.data.user_id,
        isLoading: false,
      })
    );
    axios
      .get(`http://127.0.0.1:8000/addfriend/friend/${params.user_id}`)
      .then((response) =>
        this.setState({
          totalConn: response.data.length,
        })
      );
    axios
      .get(`http://127.0.0.1:8000/addfriend/getFollowers/${params.user_id}`)
      .then((response) =>
        this.setState({
          totalFollowers: response.data.length,
        })
      );
    if (u !== null) {
      axios
        .get(
          `http://127.0.0.1:8000/addfriend/isFollow/${u.id}/${params.user_id}`
        )
        .then((response) => {
          if (response.data === true) {
            this.setState({ isFollow: "Unfollow" });
          }
        });
      axios
        .get(
          `http://127.0.0.1:8000/addfriend/isFriend/${u.id}/${params.user_id}`
        )
        .then((response) => {
          if (response.data === true) {
            this.setState({ isFriend: true });
          }
        });
        axios
        .get(
          `http://127.0.0.1:8000/addfriend/isBlocked/${u.id}/${params.user_id}`
        )
        .then((response) => {
          if (response.data === true) {
            this.setState({ isBlock: "Unblock" });
          }
        });
    }
  }

  handleClick = (id) => {
    let form_data = new FormData();
    if (u !== null) {
      form_data.append("from_user", u.id);
      form_data.append("to_user", id);
      const url = `http://127.0.01.:8000/addfriend/allRequest`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.statusText === "Created") {
            this.setState({ isSent: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ error: "You have to sign in first." });
    }
  };

  removeConnection = (id) => {
    if (u !== null) {
      fetch(
        `http://127.0.0.1:8000/addfriend/removeconnection/${u.id}/${id}`
      ).then((response) => {
        if (response.statusText === "OK") {
          this.setState({ isSent: false, isFriend: false });
        }
      });
    }
  };

  handleFollow = (id, isFollow) => {
    let form_data = new FormData();
    if (u !== null) {
      if (isFollow === "Follow") {
        form_data.append("follower", u.id);
        form_data.append("followee", id);
        const url = `http://127.0.01.:8000/addfriend/addFollower`;
        axios
          .post(url, form_data, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.statusText === "Created") {
              this.setState({ isFollow: "Unfollow" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `http://127.0.01.:8000/addfriend/removeFollower/${u.id}/${id}`;
        axios
          .get(url)
          .then((response) => {
            console.log(response);
            if (response.data === "Follower Removed") {
              this.setState({ isFollow: "Follow" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      this.setState({ error: "You have to sign in first." });
    }
  };

  handleBlock = (id, isBlock) => {
    let form_data = new FormData();
    if (u !== null) {
      if (isBlock === "Block") {
        form_data.append("blocker", u.id);
        form_data.append("blocked", id);
        const url = `http://127.0.01.:8000/addfriend/blockUser`;
        axios
          .post(url, form_data, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.statusText === "Created") {
              this.setState({ isBlock: "Unblock", isFriend: false });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `http://127.0.01.:8000/addfriend/removeBlock/${u.id}/${id}`;
        axios
          .get(url)
          .then((response) => {
            console.log(response);
            if (response.data === "Block Removed") {
              this.setState({ isBlock: "Block" });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      this.setState({ error: "You have to sign in first." });
    }
  };

  render() {
    const {
      isLoading,
      isSent,
      isFollow,
      isBlock,
      users,
      user,
      totalConn,
      totalFollowers,
      isFriend,
    } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    if (isBlock === "Unblock") {
      return <p>Unblock to see the Profile</p>;
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
              <li className="inline-block">* {totalConn} Connections</li>
              <li className="inline-block">* {totalFollowers} Followers</li>
            </ul>
            <ul className="list">
              <li className="inline-block">
                {isFriend ? (
                  <input
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.removeConnection(users.user_id.id)}
                    value="Remove Connection"
                  />
                ) : (
                  <input
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleClick(users.user_id.id)}
                    value={!isSent ? "Connect" : "Pending"}
                    disabled={isSent}
                  />
                )}
              </li>
              <li className="inline-block">
                <input
                  type="button"
                  className="btn btn-primary"
                  value={isFollow}
                  onClick={() => this.handleFollow(users.user_id.id, isFollow)}
                />
              </li>
              <li className="inline-block">
                <input
                  type="button"
                  className="btn btn-primary"
                  value={isBlock}
                  onClick={() => this.handleBlock(users.user_id.id, isBlock)}
                />
              </li>
            </ul>
          </div>
          <div className="addFriend"></div>
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

export default Profile;
