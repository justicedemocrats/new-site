import React from "react";
import PropTypes from "prop-types";
// import Content, { HTMLContent } from "../components/Content";
import Candidate from "../components/Candidate";
import Banner from "../components/Banner";
import "../style/candidates.scss";

export const CandidatePageTemplate = ({
  bannerBackgroundImage,
  bannerText,
  candidates
}) => {
  // <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />,
  return (
    <div className="candidates">
      {candidates.map((props, i) => <Candidate key={i} {...props} />)}
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
            district
          }
        }
      }
    }
  }
`;
