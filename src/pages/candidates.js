import React from "react";
import PropTypes from "prop-types";
// import Content, { HTMLContent } from "../components/Content";
import Candidate from "../components/Candidate";
import Banner from "../components/Banner";
import "../style/candidates.scss";

export const CandidatePageTemplate = ({
  bannerBackgroundImage,
  bannerText,
  candidates,
  stats,
  intro
}) => {
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />,
      <div className="candidate-intro-section row container">
        <div className="six columns stat-container">
          {stats.map(({ title, count }) => {
            const split = title.split(" ");
            const first = split.slice(0, split.length - 1).join(" ");
            const last = split[split.length - 1];

            return (
              <div className="stat">
                <span className="light-m light-blue-color"> {first} </span>
                <span className="bold-m light-blue-color"> {last} </span>
                <span className="light-m light-blue-color"> = </span>
                <span className="extra-bold-m orange-color"> {count} </span>
              </div>
            );
          })}
        </div>
        <div className="six columns light-m">
          <p> {intro} </p>
        </div>
      </div>
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
  console.log(data);
  const { candidates: { edges } } = data;
  const candidates = edges.map(edge => edge.node.frontmatter);
  const {
    bannerBackgroundImage,
    bannerText,
    intro,
    stats
  } = data.page.edges[0].node.frontmatter;

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
            blurb
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
