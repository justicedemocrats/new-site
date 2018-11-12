import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import CtaModal from "../components/CtaModal";
import Navbar from "../components/Navbar";
import "./all.sass";
import "../style/footer.scss";

const TemplateWrapper = ({ data, children, location }) => {
  const content = data.allMarkdownRemark.edges[0].node.frontmatter;

  return (
    <div>
      <Helmet title="Justice Democrats" />
      <Navbar path={location.pathname} />
      <div>{children()}</div>
      <Footer {...content} />
      <CtaModal {...content} />
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export const pageQuery = graphql`
  query TemplateQuery {
    allMarkdownRemark(filter: { frontmatter: { uniq: { eq: "meta-index" } } }) {
      edges {
        node {
          frontmatter {
            paidForMessage
            copyright
            pressEmail
            generalEmail
            phone
            address
            quickLinks {
              text
              url
            }
            socialIcons {
              icon
              url
              type
            }
            ctaEnabled
            ctaName
            ctaImage
            ctaBody
            ctaText
            ctaTitle
            ctaUrl
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
