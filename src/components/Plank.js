import React from "react";
import { HTMLContent } from "../components/Content";

export default class Plank extends React.Component {
  state = { open: false };

  close = ev => {
    ev.stopPropagation();
    this.setState({ open: false });
  };

  open = ev => {
    ev.stopPropagation();
    this.setState({ open: true });
  };

  componentWillMount() {
    if (this.props.index == 0) {
      this.state.open = true;
    }
  }

  render() {
    const { title, contents } = this.props;

    return (
      <div className="plank" onClick={this.state.open ? this.close : this.open}>
        <div
          className="extra-bold-m light-blue-color plank-title"
          style={{ textTransform: "uppercase" }}
        >
          {this.state.open ? (
            <div onClick={this.close}>
              {" "}
              <img src="/assets/small-toggle-minus.svg" />{" "}
            </div>
          ) : (
            <div onClick={this.open}>
              {" "}
              <img src="/assets/small-toggle-plus.svg" />{" "}
            </div>
          )}

          {title}
        </div>

        {this.state.open && (
          <div style={{ fontSize: 18, marginBottom: 20 }}>
            <HTMLContent
              content={contents}
              className="light-m plank-contents standard-text"
              markdown={true}
            />
          </div>
        )}
      </div>
    );
  }
}
