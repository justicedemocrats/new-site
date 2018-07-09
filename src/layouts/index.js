import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Navbar from "../components/Navbar";
import "./all.sass";
import "../style/footer.scss";

const TemplateWrapper = ({ data, children, location }) => {
  const {
    paidForMessage,
    copyright,
    pressEmail,
    generalEmail,
    phone,
    address,
    quickLinks,
    socialIcons
  } = data.allMarkdownRemark.edges[0].node.frontmatter;

  console.log(location.pathname);

  return (
    <div>
      <Helmet title="Justice Democrats" />
      <Navbar path={location.pathname} />
      <div>{children()}</div>
      {!(location.pathname == "/join" || location.pathname == "/join/") && (
        <div>
          <div
            className="my-footer dark-blue-bg row"
            style={{ color: "white" }}
          >
            <div className="footer-section six columns">
              <div className="footer-section-title extra-bold-m">
                Contact Us
              </div>
              <div className="footer-section-contents medium-m standard-text contact">
                <div>
                  General:
                  <a
                    href={`mailto:${generalEmail}`}
                    target="_blank"
                    className="bold-m"
                  >
                    {generalEmail}
                  </a>
                </div>

                <div>
                  Press:
                  <a
                    href={`mailto:${pressEmail}`}
                    target="_blank"
                    className="bold-m"
                  >
                    {pressEmail}
                  </a>
                </div>

                <div>
                  Phone:
                  <a href={`tel:${phone}`} target="_blank" className="bold-m">
                    {phone}
                  </a>
                </div>

                <div>{address}</div>
              </div>
            </div>

            <div className="footer-section six columns">
              <div className="footer-section-title extra-bold-m">
                Quick Links
              </div>
              <div className="footer-section-contents quick-links standard-text">
                {quickLinks.map(({ text, url }) => (
                  <a href={url} target="_blank" className="bold-m">
                    {text}
                  </a>
                ))}
              </div>

              <div className="social-icons">
                {socialIcons
                  .filter(({ type }) => type == "social")
                  .map(({ icon, url }) => (
                    <a href={url} target="_blank">
                      <img src={icon} />
                    </a>
                  ))}

                <div className="icon-divider" />

                {socialIcons
                  .filter(({ type }) => type == "contact")
                  .map(({ icon, url }) => (
                    <a href={url} target="_blank">
                      <img src={icon} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="disclaimer">
            <div className="medium-m dark-blue-color paid-for">
              {paidForMessage}
            </div>
            <div className="light-m dark-blue-color copyright">{copyright}</div>
          </div>
        </div>
      )}
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export const pageQuery = graphql`
  query TemplateQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "footer-index" } } }
    ) {
      edges {
        node {
          frontmatter {
            paidForMessage
            copyright
            pressEmail
            generalEmail
            phone
            address
            quickLinks {
              text
              url
            }
            socialIcons {
              icon
              url
              type
            }
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
