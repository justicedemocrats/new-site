import React from "react";
import Helmet from "react-helmet";

class ActionPageTemplate extends React.Component {
  render() {
    const { embedCode, metaImg, title } = this.props;
    return (
      <div>
        <div
          style={{ height: "calc(100vh - 50px)", paddingTop: 100 }}
          id="newmode"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
        <Helmet>
          <meta name="og:image" content={metaImg} />
          <meta name="twitter:image" content={metaImg} />
          <meta name="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </Helmet>
      </div>
    );
  }

  componentDidMount() {
    window.x = document.getElementById("newmode").innerHTML;
    const regex = new RegExp("<script>.*</script>", "ms");

    debugger;

    const script = regex
      .exec(x)[0]
      .split("<script>")[1]
      .split("</script>")[0];

    window.eval(script);
  }
}

const ActionPage = props => {
  const { frontmatter: attrs } = props.data.markdownRemark;
  return <ActionPageTemplate {...attrs} />;
};

export default ActionPage;

export const pageQuery = graphql`
  query ActionPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        embedCode
      }
    }
  }
`;
