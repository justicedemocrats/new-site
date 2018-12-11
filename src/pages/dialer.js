import React from 'react'
import PropTypes from 'prop-types'
import { HTMLContent } from '../components/Content'
require('../style/home-block.scss')

class DialerPageTemplate extends React.Component {
  render() {
    const {
      html,
      frontmatter: {
        title
    }} = this.props

    return (
      <div>
        <div className="page-container" >
        <div className="page-contents" style={{marginTop: 100, position: 'relative'}}>
          <div className="extra-bold-m home-header-b"> {title} </div>
          <Divider/>
          <HTMLContent content={html} className="medium-m standard-text" />
        </div>
</div>
      </div>
    )
  }
}

const DialerPage = props => {
  const data = props.data.allMarkdownRemark.edges[0].node

  return <DialerPageTemplate {...data} />
}

export default DialerPage

export const pageQuery = graphql`
  query DialerQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "dialer-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`

const Divider = () => <div className="divider" />
