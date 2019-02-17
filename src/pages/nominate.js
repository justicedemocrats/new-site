import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";
import Candidate from "../components/Candidate";
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

  startNomination = () => {
    this.setState({ nominating: true });
    analytics.track("Nomination Modal Opened");
  };

  endNomination = () => {
    this.setState({ nominating: false });
    analytics.track("Nomination Modal Closed");
  };

  componentDidMount() {
    const params = getUrlVars();
    if (params.district) {
      this.setState({ nominating: true, districtPreset: params.district });
      analytics.track(
        "Nomination Modal Opened By Default Because of District Visit",
        { district: params.district }
      );
    }
  }

  render() {
    const {
      candidates,
      html: body,
      frontmatter: {
        header,
        subheader,
        bannerBackgroundImage,
        redirect,
        bannerText,
        stages,
        lookingForBullets,
        formIntro,
        incumbentsIntro,
        incumbentsStatement,
        thankYou,
        stage0Explanation,
        youtubeVideo
      }
    } = this.props;

    const { nominating, districtPreset } = this.state;

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
                <div>
                  <HTMLContent
                    content={body}
                    className="medium-m issues-contents standard-text"
                  />
                  <button
                    style={{ marginTop: 15, marginBottom: 15, fontSize: 19 }}
                    onClick={this.startNomination}
                    className="get-started-button extra-bold-m"
                  >
                    Start Nominating Now
                  </button>
                </div>
              </div>
            </div>
            <Divider />
            {youtubeVideo && (
              <iframe
                width="100%"
                height="400"
                src={youtubeVideo}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                className="extra-bold-m subheader-size dark-blue-color"
                style={{ marginBottom: 20, fontSize: 42, marginTop: 20 }}
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
                  <div
                    style={{
                      width: "30%",
                      minWidth: 150,
                      alignItems: "center"
                    }}
                    className="center-contents-column"
                  >
                    <img
                      src={lf.icon}
                      style={{ width: "50%", marginBottom: 10 }}
                    />
                    <div
                      className="extra-bold-m caps"
                      style={{
                        textAlign: "center",
                        fontSize: 25,
                        lineHeight: "25px",
                        marginBottom: 6
                      }}
                    >
                      {lf.header.split(" ")[0]}
                      <br />
                      {lf.header.split(" ")[1]}
                    </div>
                    <HTMLContent
                      content={lf.body}
                      markdown={true}
                      className="medium-m text-align-center font-size-16"
                    />
                  </div>
                ))}
              </div>
              <button
                style={{ marginTop: 30, marginBottom: 30, fontSize: 19 }}
                onClick={this.startNomination}
                className="get-started-button extra-bold-m"
              >
                Start Nominating Now
              </button>
              <HTMLContent
                content={formIntro}
                markdown={true}
                className="medium-m font-size-20 text-align-center"
              />
            </div>

            {nominating && (
              <FormStageManager
                stages={stages}
                redirect={redirect}
                endNomination={this.endNomination}
                thankYou={thankYou}
                stage0Explanation={stage0Explanation}
                districtPreset={districtPreset}
              />
            )}
          </div>
          <Divider />

          <div
            className="extra-bold-m dark-blue-color"
            style={{
              marginBottom: 20,
              marginTop: 10,
              fontSize: 42,
              textAlign: "left"
            }}
          >
            {incumbentsIntro}
          </div>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div className="bold-m" style={{ width: "45%", fontSize: 16 }}>
              {incumbentsStatement}
            </div>

            <Link
              to="/candidates"
              className="block-content-button button dark-blue-bg button-text full-width-button"
              style={{ width: "45%" }}
            >
              Go To 2018 Slate
            </Link>
          </div>
          <div className="candidates">
            {candidates.map((props, i) => (
              <Candidate key={i} {...props} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const NominatePage = props => {
  const data = props.data.nominate.edges[0].node;
  const candidates = props.data.candidates.edges
    .map(edge => edge.node.frontmatter)
    .filter(c => c.outcome === "Won");

  console.log(data);

  return <NominatePageTemplate {...data} candidates={candidates} />;
};

NominatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default NominatePage;

export const pageQuery = graphql`
  query NominateQuery {
    nominate: allMarkdownRemark(
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
            thankYou
            youtubeVideo
            incumbentsIntro
            incumbentsStatement
            lookingForBullets {
              icon
              header
              body
            }
            formIntro
            stage0Explanation
            stages {
              title
              preface
              display
              questions {
                label
                name
                type
                width
                required
                options {
                  option
                }
              }
            }
          }
        }
      }
    }

    candidates: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "candidate-fragment" } } }
    ) {
      edges {
        node {
          frontmatter {
            firstName
            lastName
            electionType
            incumbent
            district
            state
            electionDate
            image
            website
            donationLink
            outcome
            office
            district
            blurb
            youtubeVideo
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
