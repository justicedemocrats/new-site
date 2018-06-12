import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import '../style/navbar.scss'

const Navbar = ({path}) => {
  var navbarContents
  switch(path) { // This is clunky, but it seems to be the best way to do route-specific rendering here without swapping out the navbar entirely.
    case '/splash':
      navbarContents = (<div className="splash-navbar">
        <div className="img">img goes here</div>
        <div className="enter-site">Enter Site</div>
      </div>)
      break;
    default:
      navbarContents = <div>hello world</div>
  }
  return (
    <div className="navbar">
      {navbarContents}
    </div>
  )

}

Navbar.propTypes = {
  path: PropTypes.string.isRequired
}


export default Navbar
