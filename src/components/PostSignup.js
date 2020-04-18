import React, { useState, useEffect } from "react";
import logo from "../images/teenivo-logo.png";
import { Link } from "react-router-dom";
import { setUser, getToken } from "../Utils/Common";

export default function PostSignup() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading === true) {
      getUsers();
    }
  }, [isLoading]);

  const getUsers = () => {
    fetch(`http://teenivoapi.herokuapp.com/rest-auth/user/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + getToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .then(() => setUser(JSON.stringify(users)));
  };
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="container clearfix">
      <div className="post-signup">
        <img className="logo" src={logo} alt="logo" />
        <h3>
          <p className="text-center">Email Confirmed</p>
        </h3>
        <div>
          <p className="text-center">
            Thank you for confirming your email. While admins review your signup
            please create your profile.
          </p>
        </div>
        <div>
          <Link to={"/create-profile"}>
            <button type="submit" className="btn-first btns btn-block">
              Create Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
