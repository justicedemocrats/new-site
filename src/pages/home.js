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
        name={name.toLowerCase()}
        style={{ margin: 0, width: "100%" }}
        {...{
          Name: { type: "text", required: true },
          Email: { type: "email", required: true },
          Zip: { type: "text", maxLength: 5, required: true },
          Phone: { type: "tel" }
        }[name]}
      />
    </div>
  ));

const renderSignUpButton = () => (
  <div className="sign-up-el sign-up-button-container">
    <button
      type="submit"
      className="sign-up-button orange-bg extra-bold-m "
      style={{
        fontSize: "18px",
        textTransform: "uppercase",
        margin: 0
      }}
    >
      Sign Up
    </button>
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
    issuesIntro,
    youtubeVideo,
    bannerUrl
  } = data.landingPage.edges[0].node.frontmatter;

  console.log(data.landingPage.edges[0].node.frontmatter);

  const {
    launchModeEnabled,
    launchingCandidateName,
    launchingCandidateDonateUrl
  } = data.metas.edges[0].node.frontmatter;

  const BannerContainerDiv = props =>
    bannerUrl ? (
      <a
        style={{ display: "block" }}
        href={bannerUrl}
        className="home-banner"
        target="_blank"
      >
        {props.children}
      </a>
    ) : (
      <div className="home-banner"> {props.children} </div>
    );

  return (
    <div style={{ paddingLeft: 0, paddingRight: 0 }}>
      <BannerContainerDiv>
        <img
          src={bannerBackgroundImg}
          style={{ width: "100%", position: "absolute" }}
        />
        <Default>
          <form
            className="sign-up"
            name="main-signup"
            data-netlify="true"
            netlify="true"
            data-netlify-honeypot="bot-field"
            method="post"
            action="/donate"
            style={{
              backgroundColor: "rgba(0,118,156, .75)",
              minHeight: 60,
              position: "absolute",
              bottom: 0,
              marginBottom: -2,
              width: "100%"
            }}
          >
            <input type="hidden" name="form-name" value="main-signup" />
            {renderSignUpInputs()}
            {renderSignUpButton()}
            {launchModeEnabled && (
              <div style={{ color: "white", fontSize: "xx-small" }}>
                {`By signing up, you agree to receive communications from Justice Democrats and ${launchingCandidateName}.`}
              </div>
            )}
          </form>
        </Default>
        <Mobile>
          <form
            className="sign-up-rows"
            name="main-signup"
            data-netlify="true"
            netlify="true"
            data-netlify-honeypot="bot-field"
            method="post"
            action="/donate"
            style={{
              backgroundColor: "rgba(0, 118, 156, .75)",
              position: "absolute",
              bottom: 0,
              padding: launchModeEnabled ? 7 : 15
            }}
          >
            <div className="sign-up-row">{renderSignUpInputs()}</div>
            <div className="sign-up-row">{renderSignUpButton()}</div>
            {launchModeEnabled && (
              <div style={{ color: "white", fontSize: "xx-small" }}>
                {`By signing up, you agree to receive communications from Justice Democrats and ${launchingCandidateName}.`}
              </div>
            )}
          </form>
        </Mobile>
      </BannerContainerDiv>

      <div
        className="block-body container"
        style={{ padding: 40, paddingTop: 60, maxWidth: 1120 }}
      >
        <div className="block-contents row">
          <div className="six columns" style={{ color: "blue" }}>
            <div className="block-contents-left-chunk">
              <div className="home-header-b extra-bold-m">
                {boldHeader
                  .split(".")
                  .filter(section => section != "")
                  .map((section, idx) =>
                    idx > 0 ? [<br />, section + "."] : [section + "."]
                  )}
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
              borderBottom: "2px dotted #d5176e"
            }}
          >
            <Default>
              <img
                src={firstCalloutIcon}
                style={{
                  height: 60
                }}
              />
            </Default>
            <div className="bold-m callout-b">{firstCalloutText}</div>
          </div>
        )}
      </div>

      {youtubeVideo && (
        <div
          style={{
            padding: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <iframe
            style={{ margin: 10, maxWidth: 1040 }}
            width="100%"
            height="500"
            src={youtubeVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* <div
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
            maxWidth: 1040,
            width: "100%",
            fontSize: "42px"
          }}
        >
          <Link
            to="/candidates"
            style={{
              lineHeight: "42px",
              width: "100%",
              marginBottom: 10,
              textTransform: "uppercase",
              display: "block"
            }}
          >
            Our Candidates
          </Link>
          <Link
            style={{ overflowX: "scroll", display: "block" }}
            to="/candidates"
          >
            <div style={{ display: "table", borderSpacing: 8 }}>
              <div className="carousel-container">
                {sortFunctions.carousel(candidates).map((c, idx) => (
                  <CarouselCandidate key={idx} {...c} />
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
 */}
      <div
        style={{
          padding: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="extra-bold-m dark-blue-color"
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
            {primaryIssues.map(({ text, image, url, color }) => (
              <div
                style={{
                  height: 300,
                  paddingTop: 10
                }}
                className="four columns primary-issue-box"
              >
                <img src={image} style={{ marginBottom: 10 }} />
                <a
                  className="primary-issue-text"
                  style={{
                    textDecoration: "none",
                    bottom: 0,
                    marginTop: "auto",
                    backgroundColor: {
                      pink: "#d5176e",
                      aqua: "#6fccdd",
                      blue: "#00769c"
                    }[color]
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

      {blocks.map((b, i) => (
        <HomeBlock key={i} {...b} />
      ))}
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
            bannerUrl
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
              color
            }
            jdHighlightIcon
            jdHighlightHeader
            jdHighlightText
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
            youtubeVideo
          }
        }
      }
    }

    metas: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "meta-index" } } }
    ) {
      edges {
        node {
          frontmatter {
            launchModeEnabled
            launchingCandidateName
            launchingCandidateDonateUrl
          }
        }
      }
    }
  }
`;
