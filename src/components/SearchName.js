import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Utils/Common";
import { Link } from "react-router-dom";

let degrees = [];
export class SearchName extends Component {
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
    const url = `http://teenivoapi.herokuapp.com/accounts/searchbyname/${Search}`;
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
        fetch(`http://teenivoapi.herokuapp.com/messaging/addParticipant/${u.id}/${id}`, {
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
          <div className="searchbox">
            {users.map((user, index) => (
                 
              <div  key={index}>
                 
                <h5>
                      {user.user_id.first_name} {user.user_id.last_name}
                    </h5>
                  <h6>
                    {user.user_id.email}
                  </h6>
                  </div>
              
            ))}
          </div>
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
          
            
              <p>{error}</p>
              <input
                type="text"
                id="search-bar"
                className="searchh"
                name="Search"
                placeholder="Type Name or Multiple Names"
                onChange={this.handleChange}
              />
              {this.renderSearchResults()}
            
            {message && <p className="message">{message}</p>}
        
        </form>
      </div>
    );
  }
}

export default SearchName;
