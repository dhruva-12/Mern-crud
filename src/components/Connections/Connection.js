import React, { Component } from "react";
import { getUser } from "../../Utils/Common";
import MyConnection from "./MyConnection";
import PrimarySearchAppBar from "../Appbar/Appbar";

export class connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myconnections: [],
      isLoading: false,
      users: [],
    };
  }
  intervalID;

  componentDidMount() {
    this.getFriends();
  }

  getFriends = () => {
    const user = getUser();
    if (user !== null) {
      const id = user.id;

      fetch(`https://teenivoapi.herokuapp.com/addfriend/friend/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ myconnections: data, isLoading: false });
          //   this.intervalID = setTimeout(this.getFriends.bind(this), 5000);
        });
    }
  };

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }
  removeConnection = (id) => {
    const user = getUser();
    if (user.length !== 0) {
      const to_user_id = user.id;
      fetch(
        `https://teenivoapi.herokuapp.com/addfriend/removeconnection/${to_user_id}/${id}`
      ).then((response) => console.log(response));
    }
  };

  render() {
    const { myconnections, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div style={{ width: "100%" }}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <div className="connection">
          <MyConnection myconnections={myconnections}></MyConnection>
        </div>
      </div>
    );
  }
}

export default connections;
