import React from "react";
import PropTypes from "prop-types";
// import Link from "gatsby-link";
// import Block from "../components/HomeBlock";
import HomeBlock from "../components/HomeBlock";

const IndexPage = ({ data }) => {
  const { blocks } = data.allMarkdownRemark.edges[0].node.frontmatter;
  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"
      />
      <div className="sign-up row">
        {["Name", "Email", "Zip", "Phone"].map(name => (
          <div className="two columns">
            <input
              className="u-full-width"
              placeholder={name}
              {...{
                Name: { type: "text" },
                Email: { type: "email" },
                Zip: { type: "text", maxLength: 5 },
                Phone: { type: "tel" }
              }[name]}
            />
          </div>
        ))}
        <div className="four columns">
          <button
            type="submit"
            className="button button-primary"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Sign Up
          </button>
        </div>
      </div>
      {blocks.map(b => <HomeBlock {...b} />)}
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
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "landing-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
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
            }
          }
        }
      }
    }
  }
`;
