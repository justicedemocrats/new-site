import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Navbar from "../components/Navbar";
import "./all.sass";

const TemplateWrapper = ({ children, location }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Navbar path={location.pathname} />
    <div style={{ marginTop: 50 }}>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
