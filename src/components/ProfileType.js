import React from "react";
import logo from "../images/teenivo-logo.png";
import { Link } from "react-router-dom";

export default function ProfileType() {
  return (
    <div className="container clearfix">
      <div className="post-signup">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="main-content">
          <h5>
            <p className="text-center" style={{ fontSize: "18px" }}>
              Choose the type of profile
            </p>
          </h5>
          <div>
            <p className="text-center subtext">
              We are only allowing student profile creations for now. In future
              we will add parents, schools and more profile types.
            </p>
          </div>
          <div className="custom-control custom-radio mtb text-center">
            <input
              type="radio"
              id="customRadio1"
              name="customRadio1"
              className="custom-control-input"
              defaultChecked
            />
            <label
              className="custom-control-label subtext"
              htmlFor="customRadio1"
            >
              Student Profile
            </label>
          </div>
          <div>
            <Link to={"/create-profile"}>
              <button type="submit" className="btn-first btns btn-block">
                Start
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
