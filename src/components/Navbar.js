import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import "../style/navbar.scss";
import Responsive from "react-responsive";
import { slide as Menu } from "react-burger-menu";

// const DesktopOrTablet = props => <Responsive {...props} minWidth={992} />;
// const Mobile = props => <Responsive {...props} minWidth={992} />;
// const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const links = [
  { display: "Home", href: "/" },
  { display: "About", href: "/about" },
  { display: "Policies", href: "/issues" },
  { display: "Candidates", href: "/candidates" },
  // { display: 'News', href: '/news'},
  // { display: 'Actions', href: '/actions'},
  { display: "Store", href: "/store" },
  { display: "Join", href: "/join" }
];

class Navbar extends React.Component {
  state = { open: false };

  handleMenuChange = ({ isOpen }) => this.setState({ open: isOpen });

  render() {
    const { path } = this.props;

    if (path == "/splash" || path == "/join") {
      return (
        <div className="navbar" style={{ osition: "fixed" }}>
          <div className="navbar desktop">
            <div className="nav-social-container">
              {/* <TwitterButton />
              <FacebookButton /> */}
            </div>
            <HeaderLogo />
            <Link
              to="/"
              style={{
                width: 150,
                display: "block",
                textDecoration: "none",
                color: "white",
                padding: 10,
                textTransform: "uppercase",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="orange-bg bold-m"
            >
              <div> Enter Site </div>
            </Link>
          </div>
        </div>
      );
    }
    // var navbarContents;
    // switch (path) { // This is clunky, but it seems to be the best way to do route-specific rendering here without swapping out the navbar entirely.
    //   case "/splash":
    //     navbarContents = (
    //       <ul className="splash-navbar">
    //         <li className="img">
    //           <img src="/assets/jd-logo-horiz.png" />
    //         </li>
    //         <li className="enter-site">
    //           <div>
    //             <p>Enter Site</p>
    //           </div>
    //         </li>
    //       </ul>
    //     );
    //     break;
    //   default:
    //     navbarContents = undefined;
    // }

    return (
      <div className="navbar" style={{ position: "fixed" }}>
        <Default>
          <div className="hanger-navbar-container">
            <div className="navbar desktop">
              <div className="nav-social-container">
                <TwitterButton />
                <FacebookButton />
              </div>
              <HeaderLogo />
              <Link
                to="/donate"
                style={{
                  width: 150,
                  display: "block",
                  textDecoration: "none",
                  color: "white",
                  padding: 10,
                  textTransform: "uppercase",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                className="orange-bg bold-m"
              >
                <div> Donate </div>
              </Link>
            </div>
            <div className="navbar-hanger">
              {links.map(({ display, href }) => (
                <Link
                  className={`hanger-link bold-m ${display.toLowerCase()}`}
                  to={href}
                >
                  <div> {display} </div>
                </Link>
              ))}
            </div>
          </div>
        </Default>

        <Mobile>
          <div className="navbar mobile">
            <div className="nav-social-container">
              <TwitterButton />
              <FacebookButton />
            </div>
            <HeaderLogo />
            <Menu
              right={true}
              onStateChange={this.handleMenuChange}
              isOpen={this.state.open}
            >
              {links.map(({ display, href }) => (
                <Link className="bold-m" to={href}>
                  {display}
                </Link>
              ))}
            </Menu>
          </div>
        </Mobile>

        <Default>
          <div />
        </Default>
      </div>
    );
  }
}

Navbar.propTypes = {
  path: PropTypes.string.isRequired
};

export default Navbar;

const TwitterButton = () => (
  <a
    className="nav-social"
    href="https://twitter.com/justicedems"
    target="_blank"
  >
    <img src="/assets/twitter.svg" />
  </a>
);
const FacebookButton = () => (
  <a
    className="nav-social"
    href="https://www.facebook.com/justicedemocrats/"
    target="_blank"
  >
    <img src="/assets/facebook.svg" />
  </a>
);

const DonateLink = () => (
  <Link to="/donate" className="bold-m orange-bg">
    {" "}
    Donate{" "}
  </Link>
);
const HeaderLogo = () => (
  <Link to="/" style={{ height: 30 }}>
    <img style={{ height: 30 }} src="/assets/jd-logo-horiz.svg" />
  </Link>
);
