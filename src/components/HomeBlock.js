import React from "react";
import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
require("../style/home-block.scss");

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
        className="block-banner"
        style={{
          backgroundImage: `url(${bannerImageUrl})`,
          backgroundSize: "cover",
          // backgroundColor: "black",
          paddingLeft: 30,
          paddingRight: 30,
          height: "50vh",
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: alignItems[alignment]
        }}
      >
        <div className="extra-bold-m home-header-w">
          {bannerText.split(" ")[0]}
        </div>
        <div className="light-m home-header-w">{bannerText.split(" ")[1]}</div>
        <Link
          to={bannerButtonUrl}
          className="orange-bg extra-bold-m button-text callout-button plain-button extra-bold-m"
        >
          {bannerButtonText}
        </Link>
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
                  className="medium-m text-gray-color"
                />

                <Link
                  to={moreButtonUrl}
                  className="block-content-button button light-blue-bg button-text full-width-button"
                >
                  {moreButtonText}
                </Link>
                <div />
              </div>
            </div>
          </div>
          {calloutText && (
            <div
              className="container"
              style={{
                height: 80,
                padding: 10,
                borderTop: "1px dotted orange",
                paddingTop: 20,
                marginTop: 20
              }}
            >
              <div className="block-call-out row">
                <div
                  className="one columns"
                  style={{ backgroundImage: `url(${calloutIcon})`, height: 60 }}
                />
                <div className="eleven columns bold-m callout-b">
                  {calloutText}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
