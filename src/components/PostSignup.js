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
    fetch(`http://127.0.0.1:8000/rest-auth/user/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + getToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUser(JSON.stringify(data));
        console.log(data);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="container clearfix">
      <div className="post-signup">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div>
          <h5>
            <p className="text-center" style={{ fontSize: "18px" }}>
              Email Confirmed
            </p>
          </h5>
          <div>
            <p className="text-center subtext">
              Thank you for confirming your email. While admins review your
              signup please create your profile.
            </p>
          </div>
          <div>
            <Link to={"/profile-type"}>
              <button type="submit" className="btn-first btns btn-block">
                Create Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
