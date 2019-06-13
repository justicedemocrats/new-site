import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import "../style/about.scss";

const VolunteerPageTemplate = ({
  bannerBackgroundImage,
  bannerText,
  header,
  subheader,
  body,
  iframeUrl
}) => {
  console.log(12);
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
      <div className="page-container">
        <div className="page-contents">
          <div
            className="extra-bold-m"
            style={{ fontSize: 42, lineHeight: "42px" }}
          >
            {header}
          </div>

          <div style={{ paddingBottom: 5 }} />
          <Divider />

          <iframe src={iframeUrl} style={{ width: "100%", height: 800 }} />
        </div>
      </div>
    </div>
  );
};

const VolunteerPage = props => {
  console.log(props);
  const data = props.data.volunteerPageData.edges[0].node;
  return (
    <VolunteerPageTemplate {...{ body: data.html, ...data.frontmatter }} />
  );
};

VolunteerPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default VolunteerPage;

export const pageQuery = graphql`
  query VolunteerQuery {
    volunteerPageData: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "volunteer-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            header
            bannerBackgroundImage
            bannerText
            header
            subheader
            iframeUrl
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
