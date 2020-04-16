import React, { Component } from "react";

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: null,
      confirmPassword: null,
      status: ""
    };
  }
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const password = {
      new_password1: this.state.newPassword,
      new_password2: this.state.confirmPassword
    };
    let url = "http://127.0.0.1:8000/rest-auth/password/change/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token 2add747019daab714d3bd6d58d38891f3f943bd6"
      },
      body: JSON.stringify(password)
    }).then(result => {
      if (result.statusText === "OK") {
        this.setState({
          status: "Your password has been changed successfully."
        });
      }
    });
  };

  render() {
    const { status } = this.state.status;
    return (
      <div className="change-pass">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="register-form">
            <div className="form-label-group">
              <label htmlFor="new-pass1">New Password</label>
              <input
                type="password"
                className="form-control"
                id="new-pass1"
                name="newPassword"
                required
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="new-pass2">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="new-pass2"
                name="confirmPassword"
                required
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </div>
            {status ? <div style={{ color: "red" }}>{status}</div> : ""}
            <button type="submit" className="btn btn-primary btn-block">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
