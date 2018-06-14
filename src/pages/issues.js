import React from "react";
import PropTypes from "prop-types";
import Candidate from "../components/Candidate";

export const IssuePageTemplate = ({ issues }) => {
  const issues_rows = issues.chunk(2);
  return (
    <div className="container">
      {issues_rows.map(candidates => (
        <div className="row">
          {issues.map((props, i) => (
            <div className="six columns">
              <div>{i.title}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const IssuePage = props => {
  const data = props.data;
  const { allMarkdownRemark: { edges } } = data;
  const issues = edges.map(edge => edge.node.frontmatter);

  return <IssuePageTemplate issues={issues} />;
};

IssuePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IssuePage;

export const pageQuery = graphql`
  query IssueQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "issue-fragment" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            subtitle
            icon
          }
        }
      }
    }
  }
`;

Array.prototype.chunk = function(n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};
