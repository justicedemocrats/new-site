import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import "../style/splash-page.scss";

export const SplashPageTemplate = ({
  title,
  hed,
  subhed,
  content,
  bgimg,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="container" style={{ backgroundImage: `url(${bgimg})` }}>
      <div className="splash">
        <div className="hed">{hed}</div>
        <div className="subhed">{subhed}</div>
        <div className="form">
          <form className="splash-signup" name="splash-signup" netlify="true">
            <div className="field">
              <input type="text" name="name" placeholder="Name [required]" />
            </div>
            <div className="field">
              <input type="text" name="email" placeholder="Email [required]" />
            </div>
            <div className="field">
              <input type="text" name="zip" placeholder="Zip [required]" />
            </div>
            <div className="field">
              <input type="text" name="phone" placeholder="Phone [optional]" />
            </div>
            <input type="submit" name="submit" value="JOIN US" />
          </form>
        </div>
        <PageContent className="content" content={content} />
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
  const { markdownRemark: page } = data;

  return (
    <SplashPageTemplate
      contentComponent={HTMLContent}
      title={page.frontmatter.title}
      hed={page.frontmatter.hed}
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
  query SplashPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        hed
        subhed
        bgimg
      }
    }
  }
`;
