import React from "react";
import Banner from "../components/Banner";
import { HTMLContent } from "../components/Content";
import Question from "../components/Question";
import "../style/issues.scss";

const ENDPOINT = "https://api.justicedemocrats.com/module/";
const REDIRECT_DELAY = 3000;

class ModulePageTemplate extends React.Component {
  state = {
    data: {},
    badUrl: false,
    error: undefined,
    success: false
  };

  componentDidMount() {
    if (window.location.hash.includes("#")) {
      this.state.data.id = window.location.hash.split("#")[1];
    } else {
      const params = window.location.search.split("?")[1];
      for (let param of params.split(";")) {
        const split = param.split("=");
        const key = split[0];
        if (key == "id") {
          this.state.data.id = split[1];
        }
      }
    }

    this.state.data.module = this.props.title
      .toLowerCase()
      .replace(" ", "-")
      .replace("_", "-");

    this.state.badUrl = !this.state.data.id;

    this.forceUpdate();
  }

  setData = attribute => ev => {
    const value = ev.target.value;
    this.setState(prevState => {
      const data = Object.assign({}, prevState.data, { [attribute]: value });
      return Object.assign(prevState, { data });
    });
  };

  submit = () => {
    console.log(this.state.data);
    window.request
      .post(ENDPOINT + this.props.reference)
      .send(this.state.data)
      .end((error, res) => {
        if (error) this.setState({ error });
        this.setState({ success: true });

        setTimeout(() => {
          window.location.href = this.props.redirect;
        }, REDIRECT_DELAY);
      });
  };

  render() {
    if (this.state.badUrl) return this.renderBadUrl();
    if (this.state.error) return this.renderError();

    const { bannerBackgroundImage, title, questions, preface } = this.props;

    return (
      <div>
        <Banner backgroundImage={bannerBackgroundImage} text={title} />
        <div className="page-container">
          <div className="page-contents" style={{ textAlign: "center" }}>
            <div style={{ textAlign: "left" }}>
              <HTMLContent
                content={preface}
                markdown={true}
                className="medium-m font-size-16 text-align-left"
              />
            </div>

            <Divider />

            {!this.state.success ? (
              <div
                style={{ textAlign: "left" }}
                className="center-contents-column"
              >
                {questions.map((q, i) => (
                  <Question
                    key={i}
                    question={q}
                    setData={this.setData(q.name)}
                    value={this.state.data[q.name]}
                    ignoreWidth={true}
                  />
                ))}
                <button onClick={this.submit} className="orange-bg color-white">
                  {" "}
                  Submit{" "}
                </button>
              </div>
            ) : (
              <div className="medium-m font-size-20">
                <h1> Thanks for your submission! </h1>
                <p> We'll be in touch soon with next steps. </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderBadUrl() {
    return (
      <div
        style={{
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20%"
        }}
      >
        <h2> Hm, it seems you've stumbled upon an invalid url. </h2>
        <p>
          If you're trying to fill out the next stage of your nomination, please
          make sure that you're using the exact link you were emailed.
        </p>
        <p>
          If the problem persists, please contact us at{" "}
          <a href="mailto:us@justicedemocrats.com">us@justicedemocrats.com</a>
        </p>
      </div>
    );
  }

  renderError() {
    return (
      <div
        style={{
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20%"
        }}
      >
        <h2> Woops, it looks like something went wrong. </h2>
        <p>
          If you're trying to fill out the next stage of your nomination, please
          make sure that you're using the exact link you were emailed.
        </p>
        <p>
          If the problem persists, please contact us at{" "}
          <a href="mailto:us@justicedemocrats.com">us@justicedemocrats.com</a>
        </p>
      </div>
    );
  }
}

const ModulePage = props => {
  const { frontmatter: attrs } = props.data.module;

  const {
    bannerBackgroundImage,
    bannerText
  } = props.data.nominate.edges[0].node.frontmatter;

  Object.assign(attrs, { bannerBackgroundImage, bannerText });

  return <ModulePageTemplate {...attrs} />;
};

export default ModulePage;

export const pageQuery = graphql`
  query ModulePage($id: String!) {
    module: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        reference
        redirect
        preface
        questions {
          label
          name
          type
          width
        }
      }
    }

    nominate: allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "nominate-index" } } }
    ) {
      edges {
        node {
          frontmatter {
            bannerBackgroundImage
            bannerText
          }
        }
      }
    }
  }
`;

const Divider = () => <div className="divider" />;
