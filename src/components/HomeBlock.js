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
  return (
    <section className="home-block">
      <div
        className="block-banner"
        style={{
          backgroundImage: `url(${bannerImageUrl})`,
          backgroundSize: "cover",
          // backgroundColor: "black",
          textAlign: alignment,
          paddingLeft: 30,
          paddingRight: 30,
          textTransform: "uppercase"
        }}
      >
        <div className="extra-bold-m home-header-w">
          {bannerText.split(" ")[0]}
        </div>
        <div className="light-m home-header-w">{bannerText.split(" ")[1]}</div>
        <Link
          to={bannerButtonUrl}
          className="button orange-bg extra-bold-m button-text"
        >
          {bannerButtonText}
        </Link>
      </div>
      <div
        className="block-body container"
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <div className="block-contents row">
          <div className="six columns" style={{ color: "blue" }}>
            <div className="block-contents-left-chunk">
              <div
                className="home-header-b extra-bold-m"
                style={{ textTransform: "uppercase" }}
              >
                {header}
              </div>
              <div className="home-subheader-b light-m">{subheader}</div>
            </div>
          </div>
          <div className="six columns">
            <div className="block-contents-right-chunk">
              <HTMLContent
                content={htmlContent}
                markdown={true}
                className="light-m"
              />

              <Link
                to={moreButtonUrl}
                className="block-content-button button light-blue-bg button-text"
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
    </section>
  );
};
