import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import "../style/join-page.scss";

export const SplashPageTemplate = ({
  title,
  headerImage,
  subhed,
  content,
  bgimg,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div
      className="container full-height"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="splash">
        <div className="row">
          <div className="hed six columns">
            <img
              src={headerImage}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="subhed six columns medium-m"
            style={{ marginTop: 30 }}
          >
            {subhed}
          </div>
        </div>
        <div className="row" style={{ marginTop: 50 }}>
          <form
            className="splash-signup six columns"
            name="splash-signup"
            data-netlify="true"
            netlify="true"
            data-netlify-honeypot="bot-field"
            method="post"
            action="/home"
          >
            <input type="hidden" name="form-name" value="splash-signup" />
            <div className="inputs-container">
              <input
                className="splash-input"
                type="text"
                name="name"
                placeholder="Name"
                required="true"
              />
              <input
                className="splash-input"
                type="email"
                name="email"
                placeholder="Email"
                required="true"
              />
              <input
                className="splash-input"
                type="text"
                maxLength="5"
                minLength="5"
                name="zip"
                placeholder="Zip"
                required="true"
              />
              <input
                className="splash-input"
                name="phone"
                type="tel"
                placeholder="Phone"
              />
            </div>
            <input
              type="submit"
              name="submit"
              value="JOIN US"
              className="extra-bold-m orange-bg"
            />
          </form>
          <div className="five columns content-container medium-m">
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

SplashPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  hed: PropTypes.string.isRequired,
  subhed: PropTypes.string.isRequired,
  bgimg: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const SplashPage = ({ data }) => {
  console.log(data);
  const { allMarkdownRemark: pages } = data;
  const page = pages.edges[0].node;

  return (
    <SplashPageTemplate
      contentComponent={HTMLContent}
      title={page.frontmatter.title}
      headerImage={page.frontmatter.headerImage}
      subhed={page.frontmatter.subhed}
      content={page.html}
      bgimg={page.frontmatter.bgimg}
    />
  );
};

SplashPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SplashPage;

export const splashPageQuery = graphql`
  query SplashPage {
    allMarkdownRemark(filter: { frontmatter: { uniq: { eq: "join-page" } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            headerImage
            subhed
            bgimg
          }
        }
      }
    }
  }
`;
