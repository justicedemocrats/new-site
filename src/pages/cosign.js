import React from "react";
import request from "superagent";
import { HTMLContent } from "../components/Content";
import Banner from "../components/Banner";

const ENDPOINT = "http://localhost:8080/cosigner";

class CosignPageTemplate extends React.Component {
  state = {
    loading: true,
    error: false,
    done: false,
    cosignerId: undefined,
    badUrl: false,
    cosignerData: {}
  };

  componentWillMount() {
    if (window.location.hash === "") {
      this.state.badUrl = true;
    }
    this.state.cosignerId = window.location.hash.split("#")[1];
  }

  componentDidMount() {
    request.get(ENDPOINT + "/info/" + this.state.cosignerId).end((err, res) => {
      if (err || !res.body) {
        this.setState({ error: true, loading: false });
      } else {
        this.setState({ cosignerData: res.body, loading: false });
      }
    });
  }

  confirm = () => {
    this.setState({ loading: true });
    request
      .get(ENDPOINT + "/confirm/" + this.state.cosignerId)
      .end((err, res) => {
        if (err || !res.body) {
          this.setState({ error: true, loading: false });
        } else {
          this.setState({ done: true, loading: false });
          setTimeout(() => {
            window.location.href = this.props.frontmatter.redirect;
          }, REDIRECT_DELAY);
        }
      });
  };

  render() {
    const {
      frontmatter: { bannerBackgroundImage, bannerText, thankYou }
    } = this.props;

    const { loading, error, done, cosignerData } = this.state;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
        <div className="page-container">
          <div className="page-contents" />
          {loading && <div class="spinner" />}
          {error && (
            <div>
              <h1> Woops, looks like something went wrong. </h1>
              <p>
                Please check that you have opened the URL exactly as it appears
                in the email you received.
              </p>
              <p>
                If the problem persists, please contact{" "}
                <a href="mailto:us@justicedemocrats.com">
                  us@justicedemocrats.com
                </a>
              </p>
            </div>
          )}
          {done && <HTMLContent content={thankYou} className="medium-m" />}

          {!done && <div> </div>}
        </div>
      </div>
    );
  }
}

const CosignPage = props => {
  const nominateData = props.data.nominate.edges[0].node;

  return <CosignPageTemplate {...nominateData} />;
};

export default CosignPage;

export const pageQuery = graphql`
  query CosignQuery {
    nominate: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "nominate-index" } } }
    ) {
      edges {
        node {
          frontmatter {
            bannerBackgroundImage
            bannerText
            redirect
            thankYou
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
