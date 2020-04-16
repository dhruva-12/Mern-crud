import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Utils/Common";
import { Link } from "react-router-dom";

let degrees = [];
export class SearchPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      Search: "",
      isLoading: false,
      message: "",
      error: "",
      levels: [],
    };
    this.cancel = "";
  }
  fetchSearchResults = (Search) => {
    // if (this.cancel) {
    //   this.cancel.cancel();
    // }
    // this.cancel = axios.CancelToken.source();
    //  if (this.state.Search.length > 1) {
    const url = `http://127.0.01.:8000/accounts/searchbyname/${Search}`;
    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((response) =>
        this.setState(
          {
            users: response.data,
            isLoading: false,
            levels: this.calculateSeparation(response.data),
          },
          () => {
            // console.log(this.state.users);
            // console.log(this.calculateSeparation(response.data));
          }
        )
      )
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            isLoading: false,
            message: "Failed to fetch results.Please check network",
          });
        }
      });
    //}
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    //this.setState({ [name]: value, isLoading:true }, () => console.log(this.state));
    if (!value) {
      this.setState({ [name]: value, users: {}, message: "" });
    } else {
      this.setState({ [name]: value, isLoading: true, message: "" });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchSearchResults(this.state.Search);
  };

  calculateSeparation = (data) => {
    const u = getUser();
    if (u !== null) {
      for (let index = 0; index < data.length; index++) {
        let id = data[index].user_id.id;
        fetch(`http://127.0.0.1:8000/addfriend/checkSeperation/${u.id}/${id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            degrees[index] = data.level;
          })
          .catch((error) => console.log(error));
      }
    }
    return degrees;
  };
  renderSearchResults = () => {
    const { users, levels } = this.state;
    if (Object.keys(users).length && users.length) {
      return (
        <div className="results-container">
          <div className="col-12">
            {users.map((user, index) => (
              <div className="card" key={index}>
                <div className="card-body">
                  <Link
                    to={`/profile/${user.user_id.first_name}/${user.user_id.id}`}
                  >
                    <h5
                      className="card-title"
                      //onClick={this.calculateSeparation(user.user_id.id)}
                    >
                      {user.user_id.first_name} {user.user_id.last_name}
                    </h5>
                  </Link>
                  <p style={{ marginBottom: "10px" }}>
                    {levels[index] === "0"
                      ? "6 level"
                      : levels[index] + " level"}
                  </p>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {user.user_id.email}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };
  render() {
    const { message, error } = this.state;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="register-form">
            <div className=" form-label-group">
              <p>{error}</p>
              <input
                type="text"
                //value={Search}
                id="search-bar"
                className="form-control"
                name="Search"
                placeholder="Search By Name"
                onChange={this.handleChange}
              />
              {this.renderSearchResults()}
            </div>
            {message && <p className="message">{message}</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default SearchPeople;
