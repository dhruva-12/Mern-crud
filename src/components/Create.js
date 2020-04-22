import React, { Component } from "react";
import { getUser } from "../Utils/Common";
import { Link } from "react-router-dom";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import axios from "axios";
import logo from "../images/teenivo-logo.png";
const user = getUser();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#903749",
    },
  },
});

class Create extends Component {
  state = {
    gender: "male",
    selectedDate: new Date(),
    step: 1,
    Country: null,
    State: null,
    City: null,
    Headline: null,
    SummaryText: null,
    AboutProfile: null,
    Code: null,
    Phone: null,
    Avatar: null,
    BackgroundImage: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (date) => {
    let d = date.toISOString().split("T")[0];
    this.setState({ selectedDate: d });
  };

  handleImageChange = (event) => {
    const { name } = event.target;
    this.setState({
      [name]: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let phone = this.state.Code + this.state.Phone;
    console.log(phone);
    let form_data = new FormData();
    form_data.append("header_photo", this.state.Avatar, this.state.Avatar.name);
    if (user.length !== 0) {
      const id = user.id;
      form_data.append("user_id", id);
      form_data.append("handle", this.state.Handle);
      form_data.append("date_of_birth", this.state.selectedDate);
      form_data.append("country", this.state.Country);
      form_data.append("state", this.state.State);
      form_data.append("city", this.state.City);
      form_data.append("gender", this.state.value);
      form_data.append("headline", this.state.Headline);
      form_data.append("summary_text", this.state.SummaryText);
      form_data.append("about_profile", this.state.AboutProfie);
      form_data.append("phonenumber", phone);
      form_data.append("skills", this.state.Skills);
    }
    let url = "http://127.0.0.1:8000/accounts/profiles/";

    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.ok) {
          this.setState({ isCreated: true });
        }
      })
      .catch((err) => console.log(err));
  };

  subForm4 = () => {
    const { Headline, Country, City, State } = this.state;
    return (
      <div className="profile-text">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="profile-text-inner">
          <div>
            <h5 className="subtext text-center">Now, Add a photo</h5>
            <h6 className="subtext text-center">
              That way, people recognie you.
            </h6>
          </div>
          <div className="add-photo group-box">
            <input
              type="file"
              id="ProfileImage"
              name="Avatar"
              accept="image/png, image/jpeg, image/jpg"
              required
              onChange={this.handleImageChange}
            />
            <div className="user-detail">
              <h4 className="subtext text-center">
                {user.first_name} {user.last_name}
              </h4>
              <h5 className="subtext text-center">{Headline}</h5>
              <h6 className="subtext text-center">
                {City}, {State}, {Country}
              </h6>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn-first btns btn-block"
              onClick={this.handleSubmit}
            >
              Continue
            </button>
            <button
              type="submit"
              className="btn-second btns btn-block"
              onClick={this.backToThree}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  subForm3 = () => {
    return (
      <div className="profile-text">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div>
          <div className="profile-text-inner">
            <h5 className="subtext text-center">Where are you located?</h5>
          </div>
          <div className="text-input group-box">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="Country"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Province/State"
              name="State"
              onChange={this.handleChange}
            />

            <input
              type="text"
              placeholder="City"
              className="form-control"
              name="City"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn-first btns btn-block"
              onClick={this.submitThree}
            >
              Continue
            </button>
            <button
              type="submit"
              className="btn-second btns btn-block"
              onClick={this.backToTwo}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  subForm2 = () => {
    return (
      <div className="profile-text">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="profile-text-inner">
          <div>
            <h5 className="subtext text-center">Profile Section</h5>
            <h6 className="subtext text-center">
              This will show up on your profile
            </h6>
          </div>
          <div className="text-input group-box">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your headline text"
              name="Headline"
              onChange={this.handleChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter your summary text"
              name="SummaryText"
              onChange={this.handleChange}
            />

            <textarea
              className="form-control"
              name="AboutProfile"
              placeholder="About yours"
              rows="5"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="btn-first btns btn-block"
              onClick={this.submitTwo}
            >
              Continue
            </button>
            <button
              type="submit"
              className="btn-second btns btn-block"
              onClick={this.backToOne}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  subForm1 = () => {
    const { gender, selectedDate } = this.state;
    return (
      <div className="personal-profile">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div>
          <div>
            <h5 className="subtext text-center">
              Student: {user.first_name} {user.last_name}
            </h5>
            <h5 className="subtext text-center">Lets start your profile</h5>
            <h6 className="subtext text-center">
              This will show up on your profile
            </h6>
          </div>
          <MuiThemeProvider theme={theme}>
            <div className="group-box">
              <h6 style={{ color: "red" }}>
                You will not be able to change these values
              </h6>
              <div className="gender">
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Identify your gender:
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="dob">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    label="Date of Birth"
                    inputVariant="outlined"
                    format="yyyy/MM/dd"
                    value={selectedDate}
                    onChange={(date) => this.handleDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </MuiThemeProvider>
          <div className="group-box">
            <h6>Phone Numbers</h6>
            <div>
              <table>
                <tr className="text-center">
                  <th></th>
                  <th>Country Code</th>
                  <th>Phone Number</th>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td style={{ width: "70px" }}>
                    <input
                      className="form-control"
                      type="text"
                      name="Code"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td style={{ width: "200px" }}>
                    <input
                      className="form-control"
                      type="text"
                      name="Phone"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Home</td>
                  <td style={{ width: "70px" }}>
                    <input className="form-control" type="text" />
                  </td>
                  <td>
                    <input className="form-control" type="text" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <button
              onClick={this.submitOne}
              type="button"
              className="btn-first btns btn-block"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  submitOne = () => {
    this.setState({ step: 2 });
  };
  submitTwo = () => {
    this.setState({ step: 3 });
  };
  submitThree = () => {
    this.setState({ step: 4 });
  };
  backToOne = () => {
    this.setState({ step: 1 });
  };
  backToTwo = () => {
    this.setState({ step: 2 });
  };
  backToThree = () => {
    this.setState({ step: 3 });
  };
  render() {
    const { step } = this.state;
    if (step === 1) {
      return <div className="container clearfix">{this.subForm1()}</div>;
    } else if (step === 2) {
      return <div className="container clearfix">{this.subForm2()}</div>;
    } else if (step === 3) {
      return <div className="container clearfix">{this.subForm3()}</div>;
    } else if (step === 4) {
      return <div className="container clearfix">{this.subForm4()}</div>;
    }
  }
}

export default Create;
