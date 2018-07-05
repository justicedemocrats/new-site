import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import "../style/about.scss";

const AboutPageTemplate = ({
  bannerBackgroundImage,
  bannerText,
  header,
  leadership,
  generalEmail,
  pressEmail,
  phone,
  address,
  sections
}) => {
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
      <div className="page-container">
        <div className="page-contents">
          <HTMLContent
            content={header}
            markdown={true}
            className="about-header light-blue-color medium-m"
          />
          <Divider />
          <div className="extra-bold-m about-section-title">
            <span className="light-blue-color"> Justice Democrats </span>
            <span className="orange-color"> Leadership </span>
          </div>

          <div className="leadership-container">
            {leadership.map(({ name, title, headshot }) => (
              <div className="leader">
                <img src={headshot} />
                <div className="leader-info">
                  <div className="leader-name extra-bold-m">{name}</div>
                  <div className="leader-title bold-m light-blue-color">
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Divider />
          <div className="extra-bold-m about-section-title">
            <span className="light-blue-color"> Justice Democrats </span>
            <span className="orange-color"> Contacts </span>
          </div>
          <div className="contact-contents row">
            <div className="six columns">
              <div>
                <div className="contact-section-title extra-bold-m light-blue-color">
                  GENERAL
                </div>
                <div className="contact-email">{generalEmail}</div>
                <div className="contact-info">{phone}</div>
                <div className="contact-info">{address}</div>
              </div>
            </div>
            <div className="six columns">
              <div>
                <div className="contact-section-title extra-bold-m light-blue-color">
                  PRESS
                </div>
                <div className="contact-email">{pressEmail}</div>
              </div>
            </div>
          </div>

          <Divider />
          <div className="extra-bold-m about-section-title">
            <span className="light-blue-color"> Justice Democrats </span>
            <span className="orange-color"> FAQs </span>
          </div>

          {sections.map(({ title, items }) => (
            <div>
              <div className="faq-section-title light-blue-color extra-bold-m">
                {title}
              </div>
              {items.map(({ question, answer }) => (
                <div style={{ marginTop: 10, marginBottom: 10, fontSize: 14 }}>
                  <div className="question bold-m">{question}</div>
                  <div className="answer light-m">{answer}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = props => {
  console.log(props);
  const data = props.data.allMarkdownRemark.edges[0].node;
  return <AboutPageTemplate {...data.frontmatter} />;
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "about-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            header
            bannerBackgroundImage
            bannerText
            leadership {
              name
              title
              headshot
            }
            generalEmail
            pressEmail
            phone
            address
            sections {
              title
              items {
                question
                answer
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
