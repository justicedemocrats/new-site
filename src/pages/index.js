import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Block from "../components/HomeBlock";
import HomeBlock from "../components/HomeBlock";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data.allMarkdownRemark.edges[0].node);
    const { title, blocks } = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (
      <section className="section">
        {blocks.map(b => <HomeBlock {...b} />)}
      </section>
    );
  }
}

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
            }
          }
        }
      }
    }
  }
`;
