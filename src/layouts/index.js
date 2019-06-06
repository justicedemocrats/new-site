import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CtaModal from "../components/CtaModal";
import "./all.sass";
import "../style/footer.scss";

const TemplateWrapper = ({ data, children, location }) => {
  const content = data.allMarkdownRemark.edges[0].node.frontmatter;

  const simpleMetas = [
    ["google-site-verification", "-jhrvT598jaA36zbZ6wjXo04JLa705-J9L8jm_GNE2s"],
    ["viewport", "width=device-width, initial-scale=1, shrink-to-fit=no"],
    [
      "og:image",
      "https://www.justicedemocrats.com/img/jd_site_home_cr2020_background_1920x1980_test.jpg"
    ],
    [
      "twitter:image",
      "https://www.justicedemocrats.com/img/jd_site_home_cr2020_background_1920x1980_test.jpg"
    ],
    ["twitter:card", "summary_large_image"],
    ["og:title", "Justice Democrats | It's #OurTime"],
    ["twitter:title", "Justice Democrats | It's #OurTime"],
    ["og:text", "Justice Democrats"]
  ];

  return (
    <div>
      <Helmet>
        {simpleMetas.map(prop => (
          <meta name={prop[0]} content={prop[1]} key={prop[0]} />
        ))}
      </Helmet>
      <Navbar path={location.pathname} />
      <div>
        {/* <CtaModal {...content} path={location.pathname} /> */}
        {children()}
      </div>
      <Footer {...content} />
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
            ctaTitle
            ctaImage
            ctaBody
            ctaText
            ctaUrl
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
