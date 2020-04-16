import React, { Component } from "react";
import { getUser } from "../Utils/Common";
import { Link } from "react-router-dom";

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

      fetch(`http://127.0.0.1:8000/addfriend/friend/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ myconnections: data, isLoading: false });
          this.intervalID = setTimeout(this.getFriends.bind(this), 5000);
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
        `http://127.0.0.1:8000/addfriend/removeconnection/${to_user_id}/${id}`
      )
        .then((response) => console.log(response))
        .then(() => {
          setTimeout(this.getFriends(), 1000);
        });
    }
  };

  render() {
    const { myconnections, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container clearfix">
        <div className="connection">
          <h5>
            <p>Connections</p>
          </h5>
          {myconnections.map((r) => (
            <div className="card" key={r.id}>
              <div className="card-body">
                <Link
                  to={`/profile/${r.from_user.first_name}/${r.from_user.id}`}
                >
                  <h5 className="card-title">
                    {r.from_user.first_name} {r.from_user.last_name}
                  </h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{r.created}</h6>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ marginTop: "1em" }}
                  onClick={() => this.removeConnection(r.from_user.id)}
                >
                  Remove Connection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connections;
