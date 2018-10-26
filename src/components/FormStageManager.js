import React from "react";
import Modal from "react-modal";
import Question from "./Question";

const customStyles = {
  content: {}
};

export default class FormStageManager extends React.Component {
  state = {
    stage: 0,
    data: {}
  };

  prevStage = () =>
    this.setState({
      stage: this.state.stage - 1
    });

  nextStage = () =>
    this.setState({
      stage: this.state.stage + 1
    });

  render() {
    const { stages } = this.props;
    const { stage } = this.state;
    const { title, questions } = stages[stage];

    const rows = batchByWidth(questions);

    return (
      <Modal isOpen={true}>
        <h1> Title </h1>

        <form>
          {rows.map(r => (
            <div className="row">{r.map(q => <Question question={q} />)}</div>
          ))}
        </form>

        {stage !== 0 && <button onClick={this.prevStage}> Back </button>}
        {stage !== stages.length && (
          <button onClick={this.nextStage}> Next </button>
        )}
        {stage === stages.length && (
          <button onClick={this.submit}> Submit </button>
        )}
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
