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
      stats,
      intro,
      priorCandidatesIntro
    } = this.props;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />,
        <div className="page-container">
          <div className="candidate-intro-section row">
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
            <div
              className="six columns medium-m standard-text"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <p> {intro} </p>
            </div>
          </div>

          <div className="sort-options">
            {[
              ["State/District", "state"],
              ["Alphabetical", "alphabetical"],
              ["Primary Winners", "primaryWinners"],
              ["General Election", "generalWinners"]
            ].map(([label, key]) => (
              <button
                onClick={this.currySetSort(key)}
                className={`sort-button bold-m ${this.state.sortFunction ===
                  key && "selected"}`}
              >
                {label}
              </button>
            ))}
            <a
              className="sort-button orange-bg extra-bold-m orange-border button"
              href="https://secure.actblue.com/donate/justicedemocrats?refcode=candidatesection"
              target="_blank"
            >
              Donate to All
            </a>
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
        <div className="page-container">
          <div className="row candidate-intro-section">
            <div
              className="four columns extra-bold-m light-blue-color"
              style={{
                textTransform: "uppercase",
                fontSize: "42px",
                lineHeight: 1
              }}
            >
              Prior 2018 Primaries
            </div>
            <div className="eight columns">
              <HTMLContent
                content={priorCandidatesIntro || ""}
                markdown={true}
                className="medium-m standard-text"
              />
            </div>
          </div>
        </div>
        <div className="page-container">
          <div className="candidates">
            {sortFunctions[this.state.sortFunction](candidates).map(
              (props, i) => (
                <Candidate key={i} {...props} hideDonate={true} />
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
    intro,
    priorCandidatesIntro,
    stats
  } = data.page.edges[0].node.frontmatter;

  return (
    <CandidatePageTemplate
      candidates={candidates}
      bannerBackgroundImage={bannerBackgroundImage}
      bannerText={bannerText}
      intro={intro}
      priorCandidatesIntro={priorCandidatesIntro}
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
            priorCandidatesIntro
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
