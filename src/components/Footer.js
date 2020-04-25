import React from "react";
import logotext from "../images/teenivo-text.png";
export default function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: window.innerWidth,
      }}
    >
      <div className="footer-img">
        <img src={logotext} alt="teenivo text"></img>
      </div>
      <div className="line"></div>
      <div>
        <p className="footer-note text-center">
          © 2020 About Privacy Policy Cookie Policy Terms of Use
        </p>
      </div>
    </div>
  );
}
