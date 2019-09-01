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
    if(typeof analytics !== 'undefined'){
      analytics.track("Issue - Expanded", {
        issue: this.props.title
      });}
  };

  componentWillMount() {
    if (this.props.index === 0) {
      this.state.open = true;
    }
  }

  render() {
    const { title, contents } = this.props;

    return (
      <div className="plank">
        <button type="button"
          className="extra-bold-m dark-blue-color plank-title"
          style={{ textTransform: "uppercase" }}
          onClick={this.state.open ? this.close : this.open}
        >
          {this.state.open ? (
            <div onClick={this.close} style={{ width: 30 }}>
              {" "}
              <img src="/assets/small-toggle-minus.svg" />{" "}
            </div>
          ) : (
            <div onClick={this.open} style={{ width: 30 }}>
              {" "}
              <img src="/assets/small-toggle-plus.svg" />{" "}
            </div>
          )}

          <div style={{ width: "calc(100% - 30px)" }}>{title}</div>
        </button>

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
