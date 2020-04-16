import React, { Component } from "react";
import Axios from "axios";

export class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleClick = event => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("email", this.state.email);
    const url = `http://127.0.0.1:8000/rest-auth/password/reset/`;
    Axios.post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="forgot-pass">
        <h5>Reset Your Password</h5>
        <form onSubmit={this.handleClick} noValidate>
          <div className="register-form">
            <div className="form-label-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                id="Email"
                className="form-control"
                required
                onClick={this.handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: "1em" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ForgotPass;
