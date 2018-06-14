import React from "react";
import PropTypes from "prop-types";
import m2h from "m2h";

export const HTMLContent = ({ content, className, markdown }) =>
  markdown ? (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: m2h(content).replace(/&nbsp;/g, " ") }}
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
