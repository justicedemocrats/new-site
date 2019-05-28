import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Candidate from "../components/Candidate";
import Banner from "../components/Banner";
import "../style/candidates.scss";
import sortBy from "lodash.sortby";

const alphabeticalSort = (a, b) => {
  return a.toLowerCase() < b.toLowerCase()
    ? 1
    : a.toLowerCase() > b.toLowerCase()
    ? 1
    : 0;
};

const lastWord = string => {
  const list = string.split(" ");
  return list[list.length - 1];
};

export const sortFunctions = {
  state: candidates => sortBy(candidates, c => `${c.state}${c.district}`),
  alphabetical: candidates => sortBy(candidates, c => lastWord(c.lastName)),
  primaryWinners: candidates =>
    sortBy(
      sortBy(
        candidates.filter(c => c.electionType == "general"),
        c => `${c.state}${c.district}`
      ),
      c => new Date(c.electionDate)
    ),
  generalWinners: candidates =>
    sortBy(
      sortBy(
        sortBy(
          candidates.filter(c => c.outcome == "Won"),
          c => `${c.state}${c.district}`
        ),
        c => new Date(c.electionDate)
      ),
      c => (c.outcome == "Won" ? "A" : "Z")
    )
};

export class CandidatePageTemplate extends React.Component {
  state = { sortFunction: "state" };

  currySetSort = key => () => this.setState({ sortFunction: key });

  render() {
    const {
      bannerBackgroundImage,
      bannerText,
      candidates,
      body,
      header,
      subheader
    } = this.props;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />,
        <div className="page-container">
          <div className="row">
            <div className="six columns">
              <div className="dark-blue-color">
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

          {/* <div className="candidates">
            {sortFunctions[this.state.sortFunction](candidates).map(
              (props, i) => (
                <Candidate key={i} {...props} hideDonate={true} />
              )
            )}
          </div> */}
        </div>
        <div className="divider" />
        {/* <div className="page-container">
          <div className="row candidate-intro-section">
            <div
              className="four columns extra-bold-m light-blue-color"
              style={{
                textTransform: 'uppercase',
                fontSize: '42px',
                lineHeight: 1,
              }}
            >
              Prior 2018 Primaries
            </div>
            <div className="eight columns">
              <HTMLContent
                content={priorCandidatesIntro || ''}
                markdown={true}
                className="medium-m standard-text"
              />
            </div>
          </div>
        </div> */}
        <div className="page-container">
          <div className="candidates">
            {sortFunctions[this.state.sortFunction](candidates).map(
              (props, i) => (
                <Candidate
                  key={i}
                  {...props}
                  hideDonate={false}
                  defaultExpanded={true}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

CandidatePageTemplate.propTypes = {
  candidates: PropTypes.array.isRequired
};

const CandidatePage = ({ data }) => {
  const {
    candidates: { edges }
  } = data;
  const baseCandidates = edges.map(edge => edge.node.frontmatter);
  const candidates = baseCandidates;
  const {
    bannerBackgroundImage,
    bannerText,
    header,
    subheader
  } = data.page.edges[0].node.frontmatter;
  const body = data.page.edges[0].node.html;

  return (
    <CandidatePageTemplate
      candidates={candidates}
      bannerBackgroundImage={bannerBackgroundImage}
      bannerText={bannerText}
      header={header}
      subheader={subheader}
      body={body}
    />
  );
};

CandidatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CandidatePage;

export const pageQuery = graphql`
  query CandidateQuery2020 {
    candidates: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "2020-candidate-fragment" } }
      }
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
      filter: { frontmatter: { uniq: { eq: "2020-candidate-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            header
            subheader
            bannerBackgroundImage
            bannerText
          }
        }
      }
    }
  }
`;
