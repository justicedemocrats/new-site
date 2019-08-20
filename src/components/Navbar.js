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
  { display: "Platform", href: "/issues" },
  {
    display: "Candidates",
    href: "/candidates",
    children: [
      { display: "Nominate", href: "/nominate" },
      { display: "2020 Candidates", href: "/candidates" }
    ]
  },
  // { display: 'News', href: '/news'},
  // { display: 'Actions', href: '/actions'},
  { display: "Store", href: "https://shop.justicedemocrats.com" },
  { display: "Volunteer", href: "/volunteer" }
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
                className="light-blue-bg bold-m navbar-donate-button"
              >
                <div> Donate </div>
              </a>
            </div>
            <div className="navbar-hanger">
              {links.map(({ display, href, children }) => (
                <div
                  className={`hanger-link-container ${display.toLowerCase()}`}
                >
                  <DesktopNavLink display={display} href={href} />

                  {(children || []).map((child, idx) => (
                    <DesktopNavLink
                      {...child}
                      isChild={true}
                      heightOffset={(idx + 1) * 50}
                    />
                  ))}
                </div>
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
              {links.map(({ display, href, children }) => (
                <div onClick={this.closeMenu}>
                  <MobileNavLink display={display} href={href} />

                  {(children || []).map(child => (
                    <MobileNavLink
                      display={child.display}
                      href={child.href}
                      isChild={true}
                    />
                  ))}
                </div>
              ))}

              <div onClick={this.closeMenu}>
                <a
                  className="bold-m"
                  href="https://justicedemocrats.com/donate"
                  target="_blank"
                >
                  <div> Donate </div>
                </a>
              </div>
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
  <a href="/donate" target="_blank" className="bold-m light-blue-bg">
    Donate
  </a>
);
const HeaderLogo = () => (
  <Link to="/home" style={{ height: 30 }} className="header-logo">
    <img
      style={{ height: 30 }}
      src="/assets/jd-logo-horiz.svg"
      alt="Justice Democrats"
    />
  </Link>
);

const DesktopNavLink = ({ href, display, isChild, heightOffset }) =>
  href.startsWith("https://") ? (
    <a
      className={`hanger-link bold-m ${isChild ? "child" : ""}`}
      href={href}
      target="_blank"
    >
      <div style={{ width: "100%" }}> {display} </div>
    </a>
  ) : (
    <Link
      className={`hanger-link bold-m ${display.toLowerCase()} ${
        isChild ? "child" : ""
      }`}
      to={href}
    >
      <div style={{ width: "100%" }}> {display} </div>
    </Link>
  );

const MobileNavLink = ({ href, display, isChild }) => {
  const className = isChild ? "medium-m font-size-16" : "bold-m";

  return href.startsWith("https://") ? (
    <a className={className} href={href} target="_blank">
      <div> {display} </div>
    </a>
  ) : (
    <Link className={className} to={href}>
      <div> {display} </div>
    </Link>
  );
};
