import React, { Component } from "react";
import { getUser, getToken } from "../Utils/Common";
import { Link } from "react-router-dom";

export class mynetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRequests: [],
      isLoading: false,
      isRejected: false
    };
  }
  acceptRequest = r_id => {
    const user = getUser();
    const id = user.id;
    fetch(
      `http://127.0.0.1:8000/addfriend/requestForUser/accept/${id}/${r_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Token " + getToken(),
          "Accept-Encoding": "gzip, deflate, br"
        }
      }
    ).then(result => {
      console.log(result);
      setTimeout(this.getFriendRequests(), 1000);
    });
  };

  rejectRequest = r_id => {
    const user = getUser();
    const id = user.id;
    fetch(
      `http://127.0.0.1:8000/addfriend/requestForUser/reject/${id}/${r_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Token " + getToken()
        }
      }
    ).then(result => {
      console.log(result);
      setTimeout(this.getFriendRequests(), 1000);
    });
  };

  componentDidMount() {
    this.getFriendRequests();
  }
  getFriendRequests = () => {
    const user = getUser();
    if (user !== null) {
      const id = user.id;
      this.setState({ isLoading: true });
      fetch(`http://127.0.0.1:8000/addfriend/requestForUser/${id}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ myRequests: data, isLoading: false });
          //this.intervalID = setTimeout(this.getFriends.bind(this), 5000);
        });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { myRequests, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container clearfix">
        <div className="mynetwork">
          <div>
            <Link to={"/connections"}>My Connections</Link>
          </div>
          <div>
            <Link to={"/users/blocked"}>Blocked Users</Link>
          </div>
          <h5>
            <p>Pending Requests</p>
          </h5>
          {myRequests.map(r => (
            <div className="card" key={r.id}>
              {r.rejected ? (
                ""
              ) : (
                <div className="card-body">
                  <h5 className="card-title">
                    {r.from_user.first_name} {r.from_user.last_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{r.created}</h6>
                  <p className="card-text">{r.message}</p>

                  <div className="accept">
                    <input
                      type="button"
                      value="Accept"
                      className="btn btn-primary"
                      onClick={() => this.acceptRequest(r.id)}
                    />
                  </div>
                  <div className="reject">
                    <input
                      type="button"
                      value="Reject"
                      className="btn btn-primary"
                      onClick={() => this.rejectRequest(r.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default mynetwork;
