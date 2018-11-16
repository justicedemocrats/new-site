import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import FormStageManager from "../components/FormStageManager";
import "../style/issues.scss";

const lastWord = string => {
  const list = string.split(" ");
  return list[list.length - 1];
};

class NominatePageTemplate extends React.Component {
  state = {
    nominating: false
  };

  startNomination = () => this.setState({ nominating: true });
  endNomination = () => this.setState({ nominating: false });

  render() {
    const {
      html: body,
      frontmatter: {
        header,
        subheader,
        bannerBackgroundImage,
        redirect,
        bannerText,
        stages,
        lookingForBullets,
        formIntro
      }
    } = this.props;

    const { nominating } = this.state;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
        <div className="page-container">
          <div className="page-contents">
            <div className="row">
              <div className="six columns">
                <div className="dark-blue-color">
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
              <div
                className="extra-bold-m subheader-size dark-blue-color"
                style={{ marginBottom: 20, fontSize: 42 }}
              >
                What We're Looking For:
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap"
                }}
              >
                {lookingForBullets.map(lf => (
                  <div style={{ width: "30%", minWidth: 150 }}>
                    <div
                      className="extra-bold-m caps"
                      style={{ textAlign: "center", fontSize: 25 }}
                    >
                      {lf.header.split(" ")[0]}
                      <br />
                      {lf.header.split(" ")[1]}
                    </div>
                    <HTMLContent
                      content={lf.body}
                      markdown={true}
                      className="medium-m text-align-justify"
                    />
                  </div>
                ))}
              </div>
              <button
                style={{ marginTop: 30, marginBottom: 30 }}
                onClick={this.startNomination}
                className="get-started-button extra-bold-m"
              >
                Let's Take the First Step Together
              </button>
              <HTMLContent
                content={formIntro}
                markdown={true}
                className="medium-m"
              />
            </div>

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

const NominatePage = props => {
  const data = props.data.allMarkdownRemark.edges[0].node;

  return <NominatePageTemplate {...data} />;
};

NominatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default NominatePage;

export const pageQuery = graphql`
  query NominateQuery {
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
            lookingForBullets {
              header
              body
            }
            formIntro
            stages {
              title
              display
              questions {
                label
                name
                type
                width
              }
            }
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
