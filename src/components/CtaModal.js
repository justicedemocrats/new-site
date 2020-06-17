import React, { Component } from "react";
import Modal from "react-modal";
import { HTMLContent } from "./Content";
import store from "store";

const CTA_DELAY = 1000;

const customStyles = {
  content: {
    top: "100px",
    left: "50%",
    top: "50%",
    right: "auto",
    bottom: "auto",
    width: "85%",
    maxWidth: '750px',
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
    border: "none",
    //borderTop: "2px solid",
    boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.5)",
    padding: 0,
    overflow: 'visible'
  }
};

export default class CtaModal extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.go();
  }

  componentDidUpdate(prevProps, prevState,snapshot) {
    this.go();
  }

  go = () => {
    setTimeout(() => {
      if (
        window.location.pathname !== "/" &&
        this.props.ctaEnabled &&
        !this.modalAlreadySeen()
      ) {
        this.setState({ open: true });
      }
    }, CTA_DELAY);
  };

  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    if (!open) {
      return <div />;
    }

    const { ctaTitle, ctaImage, ctaBody, ctaText, ctaUrl } = this.props;

    return (
      <Modal isOpen={true} style={customStyles} onRequestClose={this.close} ariaHideApp={false}>
        <div
          className="cta-modal-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* <div className="cta-title home-header-b extra-bold-m">{ctaTitle}</div>
          <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
            <HTMLContent
              content={ctaBody}
              markdown={true}
              className="medium-m"
            />
            <div
              className="cta-button-container"
              style={{ width: "100%", textAlign: "center" }}
            >
              <a
                className="cta-button orange-bg bold-m"
                target="_blank"
                href={ctaUrl}
                style={{
                  color: "white",
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 50,
                  paddingRight: 50
                }}
              >
                {ctaText}
              </a>
            </div>
          </div> */}

          <button onClick={this.close} className="cta-modal-close">Close</button>

          <a href={ctaUrl} target="_blank">
            <img alt={"Jamaal Bowman Wins! Help elect more Justice Democrats! Donate"} src={ctaImage} style={{ width: "100%", maxWidth: '800px', display: 'block' }} />
          </a>
        </div>
      </Modal>
    );
  }

  modalAlreadySeen = () => {
    const { ctaName } = this.props;
    var seen = null;
    if (!store.get(ctaName)) {
      seen = false;
      store.set(ctaName, new Date());
    } else {
      const popupDate = new Date(store.get(ctaName));
      const now = Date.now();
      const thirtySecs = 30 * 1000;
      const fiveDays = 5 * 24 * 60 * 60 * 1000;
      if (now - popupDate > thirtySecs) {
        store.set(ctaName, new Date());
        seen = false;
      } else {
        seen = !!store.get(ctaName);
      }
    }
    return seen;
  };
}
