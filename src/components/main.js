import React from "react";
import logo from "../images/teenivo-logo.png";
import { Link } from "react-router-dom";

export default function main() {
  return (
    <div className="home">
      <div>
        <img className="teenivo-logo" src={logo} alt="teenivo logo"></img>
      </div>
      <div>
        <Link to={"/signup"}>
          <button type="submit" className="btns btn-first btn-block">
            Join teenivo
          </button>
        </Link>
      </div>
      <div>
        <Link to={"/signin"}>
          <button type="submit" className="btns btn-second btn-block">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
