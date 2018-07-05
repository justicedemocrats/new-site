import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import Plank from "../components/Plank";
import "../style/issues.scss";

const IssuePageTemplate = ({
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
                <div
                  className="extra-bold-m"
                  style={{ fontSize: 42, lineHeight: "42px" }}
                >
                  {header}
                </div>
                <div
                  className="medium-m"
                  style={{ fontSize: 22, lineHeight: "22px" }}
                >
                  {subheader}
                </div>
              </div>
            </div>
            <div className="six columns">
              <HTMLContent
                content={body}
                className="medium-m issues-contents"
              />
            </div>
          </div>

          {sections.map(({ title, icon, intro, planks }) => (
            <div>
              <Divider />
              <div className="row">
                <div className="two columns">
                  <img src={icon} />
                </div>
                <div className="ten columns">
                  <div>
                    <div className="extra-bold-m light-blue-color">{title}</div>
                    <div className="medium-m issue-intro"> {intro} </div>
                  </div>
                </div>
              </div>

              {(planks || []).map((plank, idx) => (
                <Plank {...plank} index={idx} />
              ))}
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
              planks {
                title
                contents
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
