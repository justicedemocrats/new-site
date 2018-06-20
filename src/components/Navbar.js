import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import "../style/navbar.scss";

const Navbar = ({ path }) => {
  var navbarContents;
  switch (path) { // This is clunky, but it seems to be the best way to do route-specific rendering here without swapping out the navbar entirely.
    case "/splash":
      navbarContents = (
        <ul className="splash-navbar">
          <li className="img">
            <img src="/assets/jd-logo-horiz.png" />
          </li>
          <li className="enter-site">
            <div>
              <p>Enter Site</p>
            </div>
          </li>
        </ul>
      );
      break;
    default:
      navbarContents = undefined;
  }
  return <div className="navbar">{navbarContents}</div>;
};

Navbar.propTypes = {
  path: PropTypes.string.isRequired
};

export default Navbar;
