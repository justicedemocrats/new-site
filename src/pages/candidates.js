import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Candidate from "../components/Candidate";

export const CandidatePageTemplate = ({ candidates }) => {
  const candidate_rows = candidates.chunk(3); // TODO deprecate this in favor of flexible rows
  return (
    <div className="container">
      {candidate_rows.map((candidates, i) => (
        <div key={i} className="row">
          {candidates.map((props, i) => (
            <div key={i} className="four columns">
              <Candidate {...props} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

CandidatePageTemplate.propTypes = {
  candidates: PropTypes.array.isRequired
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
            electionType
            incumbent
            district
            state
            electionDate
            image
            website
            donationLink
            outcome
            office
          }
        }
      }
    }
  }
`;

Array.prototype.chunk = function(n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};
