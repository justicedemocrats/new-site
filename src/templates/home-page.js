import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";

export const HomePageTemplate = ({ bannerImg, primaryText, secondaryText }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                <img src={bannerImg} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <HomePageTemplate
      // contentComponent={HTMLContent}
      bannerImg={post.frontmatter.bannerImg}
      // content={post.html}
    />
  );
};

export default HomePage;

export const homePageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        bannerImg
      }
    }
  }
`;
