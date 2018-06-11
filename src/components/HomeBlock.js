import React from "react";
import Link from "gatsby-link";

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
}) => (
  <section>
    <div
      className="block-banner"
      style={{
        backgroundImage: `url(${bannerImageUrl})`,
        textAlign: alignment
      }}
    >
      <div className="block-banner-number">{bannerText.split(" ")[0]}</div>
      <div className="block-banner-unit">{bannerText.split(" ")[1]}</div>
      <Link to={bannerButtonUrl} className="block-banner-button">
        {bannerButtonText}
      </Link>
    </div>
    <div className="block-body">
      <div className="block-contents">
        <div className="six columns">
          <div className="header">{header}</div>
          <div className="subheader">{subheader}</div>
        </div>
        <div className="six columns">
          {htmlContent}
          <Link to={moreButtonUrl} className="block-content-button">
            {moreButtonText}
          </Link>
          <div />
        </div>
      </div>
      {calloutText && (
        <div className="block-call-out">
          <div className="one columns">
            <img src={calloutIcon} />
          </div>
          <div className="eleven columns">{calloutText}</div>
        </div>
      )}
    </div>
  </section>
);
