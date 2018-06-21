import React from "react";
import PropTypes from "prop-types";
// import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
import HomeBlock from "../components/HomeBlock";
require("../style/includes/_skeleton.scss");

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
  } = data.allMarkdownRemark.edges[0].node.frontmatter;

  console.log(primaryIssues);

  return (
    <div style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${bannerBackgroundImg})`,
          backgroundSize: "cover"
        }}
      >
        <img src={bannerTextImg} />
        <div
          className="sign-up"
          style={{
            backgroundColor: "rgba(255, 255, 255, .8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            minHeight: 60
          }}
        >
          {["Name", "Email", "Zip", "Phone"].map((name, i) => (
            <div
              key={i}
              style={{
                marginTop: 0,
                marginBottom: 0
              }}
              className="flex-child"
            >
              <input
                placeholder={name}
                style={{ margin: 0 }}
                {...{
                  Name: { type: "text" },
                  Email: { type: "email" },
                  Zip: { type: "text", maxLength: 5 },
                  Phone: { type: "tel" }
                }[name]}
              />
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="button button-primary sign-up-button"
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                margin: 0
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div
        className="block-body container"
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
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
              <div className="home-subheader-b light-m">{boldSubheader}</div>
            </div>
          </div>
          <div className="six columns">
            <div className="block-contents-right-chunk">
              <HTMLContent
                content={introContent}
                markdown={true}
                className="light-m"
              />
              <div />
            </div>
          </div>
        </div>

        {firstCalloutText && (
          <div
            className="container"
            style={{
              height: 80,
              padding: 10,
              borderTop: "1px dotted orange",
              borderBottom: "1px dotted orange",
              paddingTop: 20,
              marginTop: 20
            }}
          >
            <div className="block-call-out row">
              <div
                className="one columns"
                style={{
                  backgroundImage: `url(${firstCalloutIcon})`,
                  height: 60
                }}
              />
              <div className="eleven columns bold-m callout-b">
                {firstCalloutText}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className="extra-bold-m light-blue-color"
        style={{ fontSize: "42px" }}
      >
        {issuesIntro}
      </div>

      <div className="primary-issues-container container row">
        {primaryIssues.map(({ text, image, url }) => (
          <div
            style={{
              height: 300,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover"
            }}
            className="four columns"
          >
            <a
              className="primary-issue-text"
              style={{ textDecoration: "none", bottom: 0, marginTop: "auto" }}
              href={url}
            >
              <div className="text-container">{text}</div>
            </a>
          </div>
        ))}
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
    allMarkdownRemark(
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
  }
`;
