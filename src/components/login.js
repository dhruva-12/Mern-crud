import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import logo from "../images/logo.jpeg";
import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { setUserSession, getToken } from "../Utils/Common";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoading: false,
      error: null,
      key: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = e => {
    e.preventDefault();
    const user = { email: this.state.email, password: this.state.password };
    this.setState({ error: null, isLoading: true });
    let url = "http://127.0.0.1:8000/rest-auth/login/";

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(handleErrors)
      .then(response => response.json(), this.setState({ isLoading: false }))
      .then(
        data => this.setState({ key: data.key })
        //this.props.history.push("/feed")
      )
      .catch(error => console.log(error));
  };

  render() {
    const { isLoading, error } = this.state;
    return (
      <div className="container clearfix">
        <div className="Signin">
          <img className="logo" src={logo} alt="logo" />
          <h3>
            <p className="text-center">Sign In</p>
          </h3>
          <form>
            <div className="register-form">
              <div className="form-label-group">
                <label htmlFor="Email"></label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="email"
                  placeholder="Email"
                  required
                  autoFocus
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-label-group">
                <label htmlFor="Password"></label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="password"
                  placeholder="Password"
                  required
                  autoFocus
                  onChange={this.handleChange}
                />
              </div>
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              {setUserSession(this.state.key)}
              {getToken() ? "You are logged in." : ""}
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                value={isLoading ? "Loading..." : "Sign In"}
                onClick={this.handleLogin}
                disabled={isLoading}
              >
                Sign In
              </button>

              <p className="forgot-password text-right">
                <Link to={"/forgotpassword"}> Forgot Password ?</Link>
              </p>
              <p className="Sign-Up text-left">
                <Link to={"/signup"}> Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
