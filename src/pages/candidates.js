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
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />,
      <div className="candidates">
        {candidates.map((props, i) => <Candidate key={i} {...props} />)}
      </div>
    </div>
  );
};

CandidatePageTemplate.propTypes = {
  candidates: PropTypes.array.isRequired
};

const CandidatePage = ({ data }) => {
  const { candidates: { edges } } = data;
  const candidates = edges.map(edge => edge.node.frontmatter);
  const {
    bannerBackgroundImage,
    bannerText,
    intro,
    stats
  } = data.page.edges[0].node.frontmatter;

  console.log(data.page.edges);

  return (
    <CandidatePageTemplate
      candidates={candidates}
      bannerBackgroundImage={bannerBackgroundImage}
      bannerText={bannerText}
      intro={intro}
      stats={stats}
    />
  );
};

CandidatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CandidatePage;

export const pageQuery = graphql`
  query CandidateQuery {
    candidates: allMarkdownRemark(
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

    page: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "candidate-index" } } }
    ) {
      edges {
        node {
          frontmatter {
            bannerBackgroundImage
            bannerText
            intro
            stats {
              count
              title
            }
          }
        }
      }
    }
  }
`;
