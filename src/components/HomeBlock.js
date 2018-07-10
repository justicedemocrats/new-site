import React from "react";
import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
import Responsive from "react-responsive";
require("../style/home-block.scss");

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

export default ({
  alignment,
  bannerImageUrl,
  bannerText,
  bannerButtonText,
  bannerButtonUrl,
  header,
  subheader,
  htmlContent,
  moreButtonText,
  moreButtonUrl,
  calloutIcon,
  calloutText
}) => {
  const alignItems = {
    right: "flex-end",
    center: "center",
    left: "flex-start"
  };

  return (
    <section className="home-block">
      <div
        className="block-banner page-container"
        style={{
          backgroundImage: `url(${bannerImageUrl})`,
          backgroundSize: "cover",
          height: "50vh",
          textTransform: "uppercase",
          justifyContent: "center"
        }}
      >
        <div
          className="mobile-alignment-override"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: alignItems[alignment],
            maxWidth: 1200,
            width: "100%"
          }}
        >
          <div className="extra-bold-m home-header-w">
            {bannerText.split(" ")[0]}
          </div>
          <div className="light-m home-header-w">
            {bannerText.split(" ")[1]}
          </div>
          <Link
            to={bannerButtonUrl}
            className="orange-bg extra-bold-m button-text callout-button plain-button extra-bold-m"
          >
            {bannerButtonText}
          </Link>
        </div>
      </div>

      <div className="standard-padded-container">
        <div className="block-body">
          <div className="block-contents row">
            <div className="six columns" style={{ color: "blue" }}>
              <div className="block-contents-left-chunk">
                <div
                  className="home-header-b extra-bold-m"
                  style={{ textTransform: "uppercase" }}
                >
                  {header}
                </div>
                <div className="home-subheader-b medium-m">{subheader}</div>
              </div>
            </div>
            <div className="six columns">
              <div className="block-contents-right-chunk">
                <HTMLContent
                  content={htmlContent}
                  markdown={true}
                  className="medium-m standard-text"
                />

                <Link
                  to={moreButtonUrl}
                  style={{ marginTop: 10 }}
                  className="block-content-button button light-blue-bg button-text full-width-button"
                >
                  {moreButtonText}
                </Link>
                <div />
              </div>
            </div>
          </div>

          {calloutText && (
            <div className="callout-container">
              <Default>
                <img src={calloutIcon} style={{ height: 60 }} />
              </Default>
              <div className="bold-m callout-b">{calloutText}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
