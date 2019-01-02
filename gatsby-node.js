const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

// exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
//   const config = getConfig();

//   let newConfig = {
//     ...config,
//     module: {
//       ...config.module,
//       noParse: /(mapbox-gl)\.js$/
//     }
//   };

//   if (stage === "build-html") {
//     newConfig = {
//       ...newConfig,
//       module: {
//         ...newConfig.module,
//         rules: [
//           ...newConfig.module.rules,
//           {
//             test: /(mapbox-gl)\.js$/,
//             loader: "null-loader"
//           }
//         ]
//       }
//     };
//   }

//   actions.replaceWebpackConfig(newConfig);
// };
