import React from "react";
import PropTypes from "prop-types";

export const IssuePageTemplate = ({ issues }) => {
  const issues_rows = issues.chunk(2);
  console.log(issues_rows);
  return (
    <div>
      {issues_rows.map((issue_batch, row) => (
        <div className="row" style={{ marginBottom: 10, height: 85 }}>
          {issue_batch.map((i, col) => (
            <div
              className={`six columns`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <div
                style={{
                  width: "15%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%"
                }}
                className={colorClass(row, col)}
              >
                <img src={i.icon} />
              </div>
              <div
                style={{
                  width: "80%",
                  padding: 10,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
                className={colorClass(row, col)}
              >
                <div
                  className="extra-bold-m"
                  style={{ textTransform: "uppercase" }}
                >
                  {i.title}
                </div>
                <div className="light-m">{i.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function colorClass(row, col) {
  const idx = row * 2 + col;
  return ["orange-bg", "light-blue-bg", "dark-blue-bg"][idx % 3];
}

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
