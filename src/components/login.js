import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import { Button } from "react-bootstrap";
import logo from "../images/teenivo-logo.png";
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
      key: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const user = { email: this.state.email, password: this.state.password };
    this.setState({ error: null, isLoading: true });
    let url = "https://teenivoapi.herokuapp.com/rest-auth/login/";

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
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(handleErrors)
      .then((response) => response.json(), this.setState({ isLoading: false }))
      .then((data) => this.setState({ key: data.key }))
      .catch(() =>
        this.setState({ error: "Please provide correct credentials." })
      );
  };

  redirectToProfile = () => {
    if (getToken()) {
      return <Redirect to="/email-confirmed" />;
    }
  };
  render() {
    const { isLoading, error } = this.state;
    return (
      <div className="container clearfix">
        <div className="Signin">
          <div className="logo">
            <img className="teeniv-logo" src={logo} alt="logo" />
          </div>
          <div className="main-content">
            <h5>
              <b>
                <p className="text-center">Empowering OUR kids future</p>
              </b>
            </h5>
            <form>
              <div className="register-form">
                <div className="form-label-group">
                  <input
                    type="email"
                    className="form-control input"
                    id="Email"
                    name="email"
                    placeholder="Email"
                    required
                    autoFocus
                    onChange={this.handleChange}
                    label="Email"
                  />
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    className="form-control input"
                    id="Password"
                    name="password"
                    placeholder="Password"
                    required
                    autoFocus
                    onChange={this.handleChange}
                    label="password"
                  />
                </div>
                {error && (
                  <>
                    <span style={{ color: "#990033" }}>{error}</span>
                    <br />
                  </>
                )}
                {setUserSession(this.state.key)}
                <br />
                <button
                  type="submit"
                  className="btns btn-second btn-block"
                  value={isLoading ? "Loading..." : "Sign In"}
                  onClick={this.handleLogin}
                  disabled={isLoading}
                >
                  Sign In
                </button>
                {this.redirectToProfile()}
                <div>
                  <div className="Sign-Up" style={{ float: "left" }}>
                    <Link to={"/signup"}> Sign Up</Link>
                  </div>
                  <div className="forgot-password" style={{ float: "right" }}>
                    <Link to={"/forgotpassword"}> Forgot Password ?</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
