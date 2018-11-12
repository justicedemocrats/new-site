import React from "react";
import store from "store";
import Modal from "react-modal";
import { HTMLContent } from "../components/Content";

const DELAY = 1000;

export default class CtaModal extends React.Component {
  state = {
    display: false
  };

  close = () => this.setState({ display: false });

  componentDidMount() {
    const { ctaName, ctaEnabled } = this.props;
    // if (ctaEnabled) {
    if (true) {
      const visited = store.get(ctaName);
      // if (!visited) {
      if (true) {
        setTimeout(() => this.setState({ display: true }), DELAY);
        store.set(ctaName, new Date().toISOString());
      }
    }
  }

  render() {
    const { ctaTitle, ctaImage, ctaBody, ctaText, ctaUrl } = this.props;
    const { display } = this.state;
    console.log({ ctaTitle, ctaImage, ctaBody, ctaText, ctaUrl });

    const linkComponent = ctaUrl.startsWith("https://") ? (
      <a
        href={ctaUrl}
        target="_blank"
        className="block-content-button button light-blue-bg button-text full-width-button"
        style={{ marginTop: 10, display: "block" }}
      >
        {ctaText}
      </a>
    ) : (
      <Link
        to={ctaUrl}
        style={{ marginTop: 10 }}
        className="block-content-button button light-blue-bg button-text full-width-button"
      >
        {ctaText}
      </Link>
    );

    return (
      <Modal isOpen={display} style={customStyles} onRequestClose={this.close}>
        <div className="page-container">
          <div className="page-contents">
            <div
              className="extra-bold-m dark-blue-color"
              style={{ fontSize: 42, paddingBottom: 20 }}
            >
              {ctaTitle}
            </div>
            <div className="row">
              <div className="six columns">
                <div className="light-blue-color">
                  <img src={ctaImage} />
                </div>
              </div>
              <div className="six columns">
                <HTMLContent
                  content={ctaBody}
                  className="medium-m issues-contents standard-text"
                />
              </div>
            </div>
            {linkComponent}
          </div>
        </div>
      </Modal>
    );
  }
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: "75%",
    transform: "translate(-50%, -50%)"
  }
};
