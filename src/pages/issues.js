import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import "../style/issues.scss";

export const IssuePageTemplate = ({
  html: body,
  frontmatter: {
    title,
    header,
    subheader,
    bannerBackgroundImage,
    bannerText,
    sections
  }
}) => {
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
      <div className="page-container">
        <div className="page-contents">
          <div className="row">
            <div className="six columns">
              <div className="light-blue-color">
                <div className="extra-bold-m">{header}</div>
                <div className="medium-m">{subheader}</div>
              </div>
            </div>
            <div className="six columns">
              <HTMLContent content={body} className="medium-m" />
            </div>
          </div>

          {sections.map(({ title, icon, intro }) => (
            <div>
              <Divider />
              <div className="row">
                <div className="two columns">
                  <img src={icon} />
                </div>
                <div className="ten columns">
                  <div>
                    <div className="extra-bold-m light-blue-color">{title}</div>
                    <div className="medium-m"> {intro} </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IssuePage = props => {
  console.log(props);
  const data = props.data.allMarkdownRemark.edges[0].node;

  return <IssuePageTemplate {...data} />;
};

IssuePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IssuePage;

export const pageQuery = graphql`
  query IssueQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "issue-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            header
            subheader
            bannerBackgroundImage
            bannerText
            sections {
              title
              icon
              intro
            }
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
