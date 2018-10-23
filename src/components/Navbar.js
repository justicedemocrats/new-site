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
  { display: "Home", href: "/home" },
  { display: "About", href: "/about" },
  { display: "Policies", href: "/issues" },
  { display: "Candidates", href: "/candidates" },
  // { display: 'News', href: '/news'},
  // { display: 'Actions', href: '/actions'},
  { display: "Store", href: "https://shop.justicedemocrats.com" },
  { display: "Join", href: "/" }
];

class Navbar extends React.Component {
  state = { open: false };

  handleMenuChange = ({ isOpen }) => this.setState({ open: isOpen });
  closeMenu = () => this.setState({ open: false });

  render() {
    const { path } = this.props;

    if (path == "/" || path == "") {
      return (
        <div className="navbar" style={{ osition: "fixed" }}>
          <div className="navbar desktop">
            <Default>
              <div className="nav-social-container">
                {/* <TwitterButton />
              <FacebookButton /> */}
              </div>
            </Default>
            <HeaderLogo />
            <Link
              to="/home"
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
                justifyContent: "center",
                marginLeft: 10
              }}
              className="orange-bg bold-m"
            >
              <div style={{ textAlign: "center" }}> Enter Site </div>
            </Link>
          </div>
        </div>
      );
    }

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
              <a
                href="/donate"
                target="_blank"
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
              </a>
            </div>
            <div className="navbar-hanger">
              {links.map(
                ({ display, href }) =>
                  href.startsWith("https://") ? (
                    <a
                      className="hanger-link bold-m"
                      href={href}
                      target="_blank"
                    >
                      <div> {display} </div>
                    </a>
                  ) : (
                    <Link
                      className={`hanger-link bold-m ${display.toLowerCase()}`}
                      to={href}
                    >
                      <div> {display} </div>
                    </Link>
                  )
              )}
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
                <div onClick={this.closeMenu}>
                  {/* <Link className="bold-m" to={href}>
                    {display}
                  </Link> */}
                  {href.startsWith("https://") ? (
                    <a className="bold-m" href={href} target="_blank">
                      <div> {display} </div>
                    </a>
                  ) : (
                    <Link className="bold-m" to={href}>
                      <div> {display} </div>
                    </Link>
                  )}
                </div>
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
    <img src="/assets/twitter.svg" alt="twitter" />
  </a>
);
const FacebookButton = () => (
  <a
    className="nav-social"
    href="https://www.facebook.com/justicedemocrats/"
    target="_blank"
  >
    <img src="/assets/facebook.svg" alt="facebook" />
  </a>
);

const DonateLink = () => (
  <a href="/donate" target="_blank" className="bold-m orange-bg">
    Donate
  </a>
);
const HeaderLogo = () => (
  <Link to="/home" style={{ height: 30 }} className="header-logo">
    <img style={{ height: 30 }} src="/assets/jd-logo-horiz.svg" />
  </Link>
);
