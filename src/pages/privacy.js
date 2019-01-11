import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";

const PrivacyPage = ({ data }) => {
  const html = data.privacyPages.edges[0].node.html;

  return (
    <div style={{ paddingLeft: 100, paddingRight: 100, minHeight: 200 }}>
      <HTMLContent content={html} className="medium-m standard-text" />
    </div>
  );
};

export default PrivacyPage;

export const pageQuery = graphql`
  query PageQuery {
    privacyPages: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "candidate-index" } } }
    ) {
      edges {
        node {
          html
        }
      }
    }
  }
`;
