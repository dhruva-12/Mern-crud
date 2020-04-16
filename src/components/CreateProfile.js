import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getUser } from "../Utils/Common";
import axios from "axios";
// const formValid = ({ errors, ...rest }) => {
//   let valid = true;
//   Object.values(errors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });

//   Object.values(rest).forEach(val => {
//     val == null && (valid = false);
//   });
//   return valid;
// };

export default class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Handle: null,
      dob: null,
      Country: null,
      State: null,
      City: null,
      value: "gender",
      Headline: null,
      SummaryText: null,
      AboutProfie: null,
      Phone: null,
      Skills: null,
      Avatar: null,
      BackgroundImage: null,
      isCreated: false
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();

    const user = getUser();

    let form_data = new FormData();
    form_data.append("header_photo", this.state.Avatar, this.state.Avatar.name);
    form_data.append(
      "background_photo",
      this.state.BackgroundImage,
      this.state.BackgroundImage.name
    );
    if (user.length !== 0) {
      const id = user.id;
      form_data.append("user_id", id);
      form_data.append("handle", this.state.Handle);
      form_data.append("date_of_birth", this.state.dob);
      form_data.append("country", this.state.Country);
      form_data.append("state", this.state.State);
      form_data.append("city", this.state.City);
      form_data.append("gender", this.state.value);
      form_data.append("headline", this.state.Headline);
      form_data.append("summary_text", this.state.SummaryText);
      form_data.append("about_profile", this.state.AboutProfie);
      form_data.append("phonenumber", this.state.Phone);
      form_data.append("skills", this.state.Skills);
    }
    let url = "http://127.0.0.1:8000/accounts/profiles/";

    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.ok) {
          this.setState({ isCreated: true });
        }
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  handleSelect = event => {
    this.setState({ value: event.target.value });
  };

  handleImageChange = event => {
    const { name } = event.target;
    this.setState(
      {
        [name]: event.target.files[0]
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { isCreated } = this.state;
    return (
      <div className="profile">
        <h3>
          <p className="text-center">Create Profile</p>
        </h3>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="register-form">
            <div className="form-label-group">
              <label htmlFor="handle"></label>
              <input
                type="text"
                className="form-control"
                id="handle"
                name="Handle"
                required
                placeholder="Profile Handle"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="timepicker"></label>
              <input
                type="date"
                className="form-control"
                id="timepicker"
                name="dob"
                required
                placeholder="Date of Birth"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="country"></label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="Country"
                placeholder="Country"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="state"></label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="State"
                required
                placeholder="State"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="city"></label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="City"
                required
                placeholder="City"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-label-group" style={{ marginTop: "1em" }}>
              <label htmlFor="gender"></label>
              <select
                className="custom-select form-control"
                id="gender"
                defaultValue="gender"
                onChange={this.handleSelect}
              >
                <option value="gender">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ProfileImage">Upload Your Profile Photo</label>
              <input
                type="file"
                id="ProfileImage"
                name="Avatar"
                accept="image/png, image/jpeg, image/jpg"
                required
                onChange={this.handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="BackgroundImage">Upload Background Image</label>
              <input
                type="file"
                id="BackgroundImage"
                name="BackgroundImage"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleImageChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headline"></label>
              <textarea
                className="form-control"
                placeholder="Headline"
                id="headline"
                name="Headline"
                required
                onChange={this.handleChange}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="SummaryText"></label>
              <textarea
                className="form-control"
                placeholder="Summary Text"
                id="SummaryText"
                name="SummaryText"
                required
                onChange={this.handleChange}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="AboutProfile"></label>
              <textarea
                className="form-control"
                placeholder="About Yourself"
                id="AboutProfile"
                name="AboutProfie"
                required
                onChange={this.handleChange}
                rows="5"
              />
            </div>
            <div className="form-label-group">
              <label htmlFor="phone"></label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="Phone"
                placeholder="Phone Number"
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills"></label>
              <textarea
                className="form-control"
                placeholder="Skills"
                id="skills"
                name="Skills"
                required
                onChange={this.handleChange}
                rows="2"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Save
            </button>
            <p>{isCreated ? "your profile is created now." : ""}</p>
          </div>
        </form>
      </div>
    );
  }
}
