import React from "react";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import "../style/issues.scss";

const lastWord = string => {
  const list = string.split(" ");
  return list[list.length - 1];
};

class CosignPageTemplate extends React.Component {
  startNomination = () => this.setState({ nominating: true });
  endNomination = () => this.setState({ nominating: false });

  render() {
    const {
      frontmatter: { bannerBackgroundImage, redirect, bannerText }
    } = this.props;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
        <div className="page-container">
          <div className="page-contents">
            <div className="row">
              <div className="six columns">
                <div className="light-blue-color">
                  <div
                    className="extra-bold-m"
                    style={{ fontSize: 42, lineHeight: "42px" }}
                  >
                    {header}
                  </div>
                  <div
                    className="medium-m font-size-25"
                    style={{ marginTop: 10 }}
                  >
                    {subheader}
                  </div>
                </div>
              </div>
              <div className="six columns">
                <HTMLContent
                  content={body}
                  className="medium-m issues-contents standard-text"
                />
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div className="extra-bold-m"> What We're Looking For: </div>
              <div style={{ display: "flex" }}>
                {lookingForBullets.map(lf => (
                  <div>
                    <div> {lf.header} </div>
                    <HTMLContent
                      content={lf.body}
                      markdown={true}
                      className="medium-m"
                    />
                  </div>
                ))}
              </div>
              <HTMLContent
                content={formIntro}
                markdown={true}
                className="medium-m"
              />
            </div>
            <button onClick={this.startNomination}>Let's Get Started</button>
            {nominating && (
              <FormStageManager
                stages={stages}
                redirect={redirect}
                endNomination={this.endNomination}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const CosignPage = props => {
  const data = props.data.allMarkdownRemark.edges[0].node;

  return <CosignPageTemplate {...data} />;
};

export default CosignPage;

export const pageQuery = graphql`
  query CosignQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "nominate-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            header
            subheader
            bannerBackgroundImage
            bannerText
            redirect
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
