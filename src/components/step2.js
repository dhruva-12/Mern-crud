import React from "react";
import { Link } from "react-router-dom";

export default function step2() {
  return (
    <div className="container clearfix">
      <div className="profile-text">
        <div>
          <h5 className="subtext text-center">Profile Section</h5>
          <h6 className="subtext text-center">
            This will show up on your profile
          </h6>
        </div>
        <div className="text-input">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your headline text"
            name="headline"
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter your summary text"
            name="summary text"
          />
          <textarea
            className="form-control"
            name="about profile"
            placeholder="About yours"
            rows="5"
          ></textarea>
        </div>
        <div>
          <Link to={"/step2"}>
            <button type="submit" className="btn-first btns btn-block">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
