import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import "../style/about.scss";

const VolunteerPageTemplate = ({
  bannerBackgroundImage,
  bannerText,
  header,
  iframeUrl
}) => {
  console.log(12);
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
      <div className="page-container">
        <div className="page-contents">
          <HTMLContent
            content={header}
            markdown={true}
            className="about-header dark-blue-color medium-m subheader-size"
          />
          <div style={{ paddingBottom: 5 }} />
          <Divider />

          <iframe src={iframeUrl} style={{ width: "100%", height: 800 }} />
        </div>
      </div>
    </div>
  );
};

const VolunteerPage = props => {
  const data = props.data.allMarkdownRemark.edges[0].node;
  console.log(43);
  return <VolunteerPageTemplate {...data.frontmatter} />;
};

VolunteerPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default VolunteerPage;

export const pageQuery = graphql`
  query VolunteerQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "volunteer-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            header
            bannerBackgroundImage
            bannerText
            iframeUrl
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
