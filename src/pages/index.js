import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
import HomeBlock from "../components/HomeBlock";
import Responsive from "react-responsive";
import CarouselCandidate from "../components/CarouselCandidate";
import { sortFunctions } from "./candidates";
require("../style/includes/_skeleton.scss");

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const renderSignUpInputs = () =>
  ["Name", "Email", "Zip", "Phone"].map((name, i) => (
    <div key={i} className="sign-up-el">
      <input
        placeholder={name}
        className="sign-up-input"
        style={{ margin: 0, width: "100%" }}
        {...{
          Name: { type: "text" },
          Email: { type: "email" },
          Zip: { type: "text", maxLength: 5 },
          Phone: { type: "tel" }
        }[name]}
      />
    </div>
  ));

const renderSignUpButton = () => (
  <div className="sign-up-el sign-up-button-container">
    <input
      type="submit"
      className="sign-up-button dark-blue-bg extra-bold-m "
      style={{
        fontSize: "18px",
        textTransform: "uppercase",
        margin: 0
      }}
      value="Sign Up"
    />
  </div>
);

const IndexPage = ({ data }) => {
  const {
    blocks,
    primaryIssues,
    bannerBackgroundImg,
    bannerTextImg,
    boldHeader,
    boldSubheader,
    introContent,
    firstCalloutIcon,
    firstCalloutText,
    issuesIntro
  } = data.landingPage.edges[0].node.frontmatter;

  const { candidates: { edges: candidateEdges } } = data;
  const candidates = candidateEdges.map(edge => edge.node.frontmatter);

  return (
    <div style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${bannerBackgroundImg})`,
          backgroundSize: "cover",
          paddingTop: 50
        }}
      >
        <img src={bannerTextImg} />
        <Default>
          <form
            className="sign-up"
            name="main-signup"
            data-netlify="true"
            netlify="true"
            method="post"
            style={{
              backgroundColor: "rgba(255, 255, 255, .8)",
              minHeight: 60
            }}
          >
            <input type="hidden" name="form-name" value="main-signup" />
            {renderSignUpInputs()}
            {renderSignUpButton()}
          </form>
        </Default>
        <Mobile>
          <div
            className="sign-up-rows"
            style={{ backgroundColor: "rgba(255, 255, 255, .8)" }}
          >
            <div className="sign-up-row">{renderSignUpInputs()}</div>
            <div className="sign-up-row">{renderSignUpButton()}</div>
          </div>
        </Mobile>
      </div>

      <div
        className="block-body container"
        style={{ padding: 40, paddingTop: 60, maxWidth: 1120 }}
      >
        <div className="block-contents row">
          <div className="six columns" style={{ color: "blue" }}>
            <div className="block-contents-left-chunk">
              <div
                className="home-header-b extra-bold-m"
                style={{ textTransform: "uppercase" }}
              >
                {boldHeader}
              </div>
              <div
                className="home-subheader-b medium-m "
                style={{ marginTop: 10 }}
              >
                {boldSubheader}
              </div>
            </div>
          </div>
          <div className="six columns">
            <div className="block-contents-right-chunk standard-text">
              <HTMLContent
                content={introContent}
                markdown={true}
                className="medium-m"
              />
              <div />
            </div>
          </div>
        </div>

        {firstCalloutText && (
          <div
            className="callout-container"
            style={{
              borderBottom: "1px dotted orange"
            }}
          >
            <img
              src={firstCalloutIcon}
              style={{
                height: 60
              }}
            />
            <div className="bold-m callout-b">{firstCalloutText}</div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="extra-bold-m light-blue-color"
          style={{
            maxWidth: "1040px",
            width: "100%",
            fontSize: "42px"
          }}
        >
          <div style={{ lineHeight: "42px", width: "100%" }}>{issuesIntro}</div>

          <div
            className="primary-issues-container row"
            style={{ marginTop: 30 }}
          >
            {primaryIssues.map(({ text, image, url }) => (
              <div
                style={{
                  height: 300,
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                className="four columns"
              >
                <a
                  className="primary-issue-text"
                  style={{
                    textDecoration: "none",
                    bottom: 0,
                    marginTop: "auto"
                  }}
                  href={url}
                >
                  <div className="text-container">{text}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="extra-bold-m light-blue-color"
          style={{
            width: 1040,
            width: "100%",
            fontSize: "42px"
          }}
        >
          <div style={{ lineHeight: "42px", width: "100%", marginBottom: 10 }}>
            Our Candidates
          </div>
          <Link
            style={{ overflowX: "scroll", display: "block" }}
            to="/candidates"
          >
            <div style={{ display: "table", borderSpacing: 8 }}>
              <div className="carousel-container">
                {sortFunctions
                  .electionDate(candidates)
                  .map((c, idx) => <CarouselCandidate key={idx} {...c} />)}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {blocks.map((b, i) => <HomeBlock key={i} {...b} />)}
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    landingPage: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "landing-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            bannerBackgroundImg
            bannerTextImg
            boldHeader
            boldSubheader
            introContent
            firstCalloutIcon
            firstCalloutText
            issuesIntro
            primaryIssues {
              text
              image
              url
            }
            blocks {
              header
              subheader
              bannerText
              calloutIcon
              calloutText
              bannerButtonUrl
              bannerButtonText
              moreButtonUrl
              moreButtonText
              htmlContent
              alignment
              bannerImageUrl
            }
          }
        }
      }
    }

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
  }
`;
