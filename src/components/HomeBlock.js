import React from "react";
import Link from "gatsby-link";
import { HTMLContent } from "../components/Content";
import "../style/home-block.scss";

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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"
      />
      <div
        className="block-banner"
        style={{
          // backgroundImage: `url(${bannerImageUrl})`,
          backgroundColor: "black",
          padding: 30,
          textAlign: alignment,
          height: 300,
          color: "#fff",
          textTransform: "uppercase",
          fontSize: 40
        }}
      >
        <div className="block-banner-number" style={{ fontWeight: "bold" }}>
          {bannerText.split(" ")[0]}
        </div>
        <div className="block-banner-unit">{bannerText.split(" ")[1]}</div>
        <Link to={bannerButtonUrl} className="block-banner-button">
          {bannerButtonText}
        </Link>
      </div>
      <div className="block-body container">
        <div className="block-contents row">
          <div className="six columns" style={{ color: "blue" }}>
            <div className="block-contents-left-chunk">
              <div
                className="header"
                style={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {header}
              </div>
              <div className="subheader">{subheader}</div>
            </div>
          </div>
          <div className="six columns">
            <div className="block-contents-right-chunk">
              <HTMLContent content={htmlContent} markdown={true} />

              <Link
                to={moreButtonUrl}
                className="block-content-button button button-primary"
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
              <div className="eleven columns">{calloutText}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
