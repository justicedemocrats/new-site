import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";

export const CandidatePageTemplate = ({ candidates }) => {
  return (
    <div>
      {candidates.map(({ firstName, lastName, electionType, electionDate }) => (
        <div>
          <div>
            {firstName} {lastName}
          </div>
          <div>
            Election for {electionType} on {electionDate}
          </div>
        </div>
      ))}
    </div>
  );
};

CandidatePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  hed: PropTypes.string.isRequired,
  subhed: PropTypes.string.isRequired,
  bgimg: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const CandidatePage = ({ data }) => {
  const { allMarkdownRemark: { edges } } = data;
  const candidates = edges.map(edge => edge.node.frontmatter);

  return <CandidatePageTemplate candidates={candidates} />;
};

CandidatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CandidatePage;

export const pageQuery = graphql`
  query CandidateQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "candidate-fragment" } } }
    ) {
      edges {
        node {
          frontmatter {
            firstName
            lastName
            electionDate
            electionType
          }
        }
      }
    }
  }
`;
