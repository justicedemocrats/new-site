import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import FormStageManager from "../components/FormStageManager";
import "../style/issues.scss";

const lastWord = string => {
  const list = string.split(" ");
  return list[list.length - 1];
};

const NominatePageTemplate = ({
  html: body,
  frontmatter: { header, subheader, bannerBackgroundImage, bannerText, stages }
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
                  className="medium-m font-size-25"
                  style={{ marginTop: 10 }}
                >
                  {subheader}
                </div>
              </div>
            </div>
            <div className="six columns">
              <HTMLContent
                content={body}
                className="medium-m issues-contents standard-text"
              />
            </div>
          </div>
          <FormStageManager stages={stages} />
        </div>
      </div>
    </div>
  );
};

const NominatePage = props => {
  console.log(props);
  const data = props.data.allMarkdownRemark.edges[0].node;

  return <NominatePageTemplate {...data} />;
};

NominatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default NominatePage;

export const pageQuery = graphql`
  query NominateQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "nominate-index" } } }
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
            stages {
              title
              questions {
                label
                name
                type
                width
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
