import React, { Component } from "react";
import logo from "../images/teenivo-logo.png";
import "../App.css";
import { Link } from "react-router-dom";

const formValid = ({ errors, ...rest }) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val == null && (valid = false);
  });
  return valid;
};
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const passwordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      isRegistered: false,
      errors: {
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      },
      formInvaliderror: "",
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstNameError =
          value.length < 3
            ? "First Name should contain more than 3 characters"
            : "";
        break;
      case "lastName":
        errors.lastNameError =
          value.length < 3
            ? "Last Name should contain more than 3 characters"
            : "";
        break;
      case "email":
        errors.emailError = emailRegex.test(value)
          ? ""
          : "Please, enter a valid email.";
        break;
      case "password":
        errors.passwordError = passwordRegex.test(value)
          ? ""
          : "Minimum 8 characters, at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character reuired.";
        break;
      case "confirmPassword":
        errors.confirmPasswordError =
          this.state.password === value
            ? ""
            : "Confirm Password and Password must be same.";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (formValid(this.state)) {
      let user = {
        email: this.state.email,
        password1: this.state.password,
        password2: this.state.confirmPassword,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      };

      let url = "http://127.0.0.1:8000/rest-auth/registration/";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      }).then((result) => {
        if (result.ok) {
          this.setState({ isRegistered: true });
          this.props.history.push("/signin");
        }
      });
    } else {
      this.setState({ formInvaliderror: "Please, fill all details." });
    }
  };
  render() {
    const { errors, isRegistered, formInvaliderror } = this.state;
    return (
      <div className="container clearfix">
        <div className="Signup">
          <img className="logo" src={logo} alt="logo" />
          <h5>
            <p className="text-center">Empowering OUR kids future</p>
          </h5>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="register-form">
              <div className="form-label-group">
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  autoFocus
                  onChange={this.handleChange}
                  aria-label="First Name"
                />
                <div className="error">{errors.firstNameError}</div>
              </div>
              <div className="form-label-group">
                <input
                  type="text"
                  className="form-control"
                  id="LastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  autoFocus
                  onChange={this.handleChange}
                  aria-label="Last Name"
                />
                <div className="error">{errors.lastNameError}</div>
              </div>
              <div className="form-label-group">
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="email"
                  placeholder="Email"
                  required
                  autoFocus
                  onChange={this.handleChange}
                  aria-label="Email"
                />
                <div className="error">{errors.emailError}</div>
              </div>
              <div className="form-label-group">
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="password"
                  placeholder="Password"
                  required
                  autoFocus
                  onChange={this.handleChange}
                  aria-label="Password"
                />
                <div className="error">{errors.passwordError}</div>
              </div>
              <div className="form-label-group">
                <input
                  type="password"
                  className="form-control"
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  autoFocus
                  onChange={this.handleChange}
                  aria-label="Confirm Password"
                />
                <span className="error">{errors.confirmPasswordError}</span>
              </div>
              <div className="form-group">
                <div className="agreement">
                  <p>
                    By clicking Join teenivo, You agree to teenivo User
                    Agreement, Privacy Policy and Cookie Policy. Ypu may get
                    email notifications. Learn More.
                  </p>
                </div>
              </div>
              <button type="submit" className="btn btn-next btn-block">
                Join teenivo
              </button>
              <span className="error">{formInvaliderror}</span>
              <p>
                {isRegistered
                  ? "Thank you for registering with us. Please confirm your account by clicking on link sent you on your email."
                  : ""}
              </p>
              <p className="forgot-password text-right">
                Already have an account? <Link to={"/signin"}>Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
