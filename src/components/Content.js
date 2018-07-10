import React from "react";
import PropTypes from "prop-types";
import showdown from "showdown";

export const HTMLContent = ({ content, className, markdown }) =>
  markdown ? (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: new showdown.Converter()
          .makeHtml(content)
          .replace(/&nbsp;/g, " ")
      }}
    />
  ) : (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
