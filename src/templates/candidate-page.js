import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import "../style/about-page.scss";

export const CandidatePageTemplate = ({
  title,
  hed,
  subhed,
  content,
  bgimg,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div className="splash" style={{ backgroundImage: `url(${bgimg})` }}>
      <div className="hed">{hed}</div>
      <div className="subhed">{subhed}</div>
      <div className="form">
        <form className="splash-signup" name="splash-signup" netlify="true">
          <input type="text" name="name" placeholder="Name [required]" />
          <input type="text" name="email" placeholder="Email [required]" />
          <input type="text" name="zip" placeholder="Zip [required]" />
          <input type="text" name="phone" placeholder="Phone [optional]" />
          <input type="submit" name="submit" value="JOIN US" />
        </form>
      </div>
      <div className="content">
        <PageContent className="content" content={content} />
      </div>
    </div>
  );
};

CandidatePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  hed: PropTypes.string.isRequired,
  subhed: PropTypes.string.isRequired,
  bgimg: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const CandidatePage = ({ data }) => {
  // const { markdownRemark: page } = data;

  return (
    <div> HI </div>
    // <CandidatePageTemplate
    //   contentComponent={HTMLContent}
    //   title={page.frontmatter.title}
    //   hed={page.frontmatter.hed}
    //   subhed={page.frontmatter.subhed}
    //   content={page.html}
    //   bgimg={page.frontmatter.bgimg}
    // />
  );
};

CandidatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CandidatePage;

export const candidatePageQuery = graphql`
  query CandidateQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "candidate" } } }
    ) {
      edges {
        node {
          frontmatter {
            firstName
          }
        }
      }
    }
  }
`;
