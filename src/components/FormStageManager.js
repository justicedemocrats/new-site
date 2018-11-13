import React from "react";
import Modal from "react-modal";
import Question from "./Question";
import request from "superagent";

const ENDPOINT = "https://api.justicedemocrats.com/nominate/";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export default class FormStageManager extends React.Component {
  state = {
    stage: 0,
    data: {},
    error: undefined,
    success: false,
    mode: undefined
  };

  prevStage = () =>
    this.setState({
      stage: this.state.stage - 1
    });

  nextStage = () =>
    this.setState({
      stage: this.state.stage + 1
    });

  setMode = mode => () => this.setState({ mode });
  setData = attribute => ev => {
    const value = ev.target.value;
    this.setState(prevState => {
      const data = Object.assign({}, prevState.data, { [attribute]: value });
      return Object.assign(prevState, { data });
    });
  };

  submit = () => {
    request
      .post(ENDPOINT + this.props.mode)
      .send(this.state.data)
      .end((error, res) => {
        if (error) this.setState({ error });
        this.setState({ success: true });
      });
  };

  render() {
    const { stage, error, success, mode } = this.state;

    if (mode === undefined) {
      return this.renderPreStage();
    }

    const stages = this.props.stages.filter(
      s => s.display == mode || s.display == "both"
    );
    const { title, questions } = stages[stage];
    console.log(stages[stage]);

    const rows = batchByWidth(questions);

    return (
      <Modal isOpen={true} style={customStyles}>
        {success ? (
          <div>
            <h1> Your Submission Has Been Received </h1>
            <p> You will receive an email shortly with further instructions </p>
          </div>
        ) : error ? (
          <div>
            <h1> Hm, there seems to have been an error. </h1>
            <p>
              Our developers have already been alerted, and will be working on
              it as soon as possible to process your nomination
            </p>
          </div>
        ) : (
          <div>
            <h1> {title} </h1>

            <form>
              {rows.map(r => (
                <div className="row">
                  {r.map(q => (
                    <Question
                      question={q}
                      setData={this.setData(q.name)}
                      value={this.state.data[q.name]}
                    />
                  ))}
                </div>
              ))}
            </form>

            <div
              className="button-row"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {stage !== 0 && <button onClick={this.prevStage}> Back </button>}
              {stage < stages.length - 1 && (
                <button onClick={this.nextStage}> Next </button>
              )}
              {stage === stages.length - 1 && (
                <button onClick={this.submit}> Submit </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    );
  }

  renderPreStage() {
    const buttonStyle = {
      width: "40%",
      height: 100
    };

    return (
      <Modal isOpen={true} style={customStyles}>
        <h1>
          We're accepting nominations for specific candidates, but we're also
          accepting nominations for districts, even if you don't have a
          candidate in mind.
        </h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button style={buttonStyle} onClick={this.setMode("district")}>
            I don't have a candidate yet
          </button>
          <button style={buttonStyle} onClick={this.setMode("candidate")}>
            I have a candidate
          </button>
        </div>
      </Modal>
    );
  }
}

function batchByWidth(questions) {
  const rows = [];
  let currentRow = [];

  questions.forEach(q => {
    if (q.width === "full") {
      currentRow = [];
      rows.push([q]);
    }

    if (q.width === "half") {
      currentRow.push(q);
      if (currentRow.length === 2) {
        rows.push(currentRow);
        currentRow = [];
      }
    }

    if (q.width === "quarter") {
      currentRow.push(q);
      if (currentRow.length === 4) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
  });

  return rows;
}
