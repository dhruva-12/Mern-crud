import React, { Component } from "react";
import { getUser } from "../Utils/Common";

export class BlockedUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedUsers: [],
      isLoading: false
    };
  }
  intervalID;

  componentDidMount() {
    this.getBlockedUsers();
  }

  getBlockedUsers = () => {
    const user = getUser();
    if (user !== null) {
      const id = user.id;

      fetch(`http://127.0.0.1:8000/addfriend/getBlocked/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ blockedUsers: data, isLoading: false });
          this.intervalID = setTimeout(this.getBlockedUsers.bind(this), 10000);
        });
    }
  };

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }
  removeBlock = (id) => {
    const user = getUser();
    if (user.length !== 0) {
      const blocked = user.id;
      fetch(
        `http://127.0.0.1:8000/addfriend/removeBlock/${id}/${blocked}`
      )
        .then((response) => console.log(response))
        .then(() => {
          setTimeout(this.getBlockedUsers(), 1000);
        });
    }
  };

  render() {
    const { blockedUsers, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container clearfix">
        <div className="connection">
          <h5>
            <p>Blocked Users</p>
          </h5>
          {blockedUsers.map((r) => (
            <div className="card" key={r.id}>
              <div className="card-body">
            
                  <h5 className="card-title">
                    {r.blocked.first_name} {r.blocked.last_name}
                  </h5>
                
                <h6 className="card-subtitle mb-2 text-muted">{r.created}</h6>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ marginTop: "1em" }}
                  onClick={() => this.removeBlock(r.blocked.id)}
                >
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BlockedUsers;
