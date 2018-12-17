import React from "react";

class ActionPageTemplate extends React.Component {
  render() {
    const { embedCode } = this.props;
    return (
      <div
        style={{ height: "calc(100vh - 50px)", paddingTop: 100 }}
        id="newmode"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
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
