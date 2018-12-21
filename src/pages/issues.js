import React from 'react'
import PropTypes from 'prop-types'
import { HTMLContent } from '../components/Content'
import Banner from '../components/Banner'
import Plank from '../components/Plank'
import '../style/issues.scss'

const lastWord = string => {
  const list = string.split(' ')
  return list[list.length - 1]
}

const IssuePageTemplate = ({
  html: body,
  frontmatter: {
    title,
    header,
    subheader,
    bannerBackgroundImage,
    bannerText,
    sections,
  },
}) => {
  return (
    <div>
      <Banner backgroundImage={bannerBackgroundImage} text={bannerText} />
      <div className="page-container">
        <div className="page-contents">
          <div className="row">
            <div className="six columns">
              <div className="dark-blue-color">
                <div
                  className="extra-bold-m"
                  style={{ fontSize: 42, lineHeight: '42px' }}
                >
                  {header}
                </div>
                <div
                  className="medium-m font-size-25"
                  style={{ marginTop: 10 }}
                >
                  {subheader}
                </div>
              </div>
            </div>
            <div className="six columns">
              <HTMLContent
                content={body}
                className="medium-m issues-contents standard-text"
              />
            </div>
          </div>

          {sections.map(({ title, icon, intro, planks }) => (
            <div>
              <div
                id={lastWord(title).toLowerCase()}
                name={lastWord(title).toLowerCase()}
                style={{ marginTop: -100, display: 'inline-block' }}
              />

              <Divider />
              <div className="policy-section-title-container">
                <div className="icon-container">
                  <img src={icon} style={{ maxHeight: 150, maxWidth: 150 }} />
                </div>
                <div className="text-container center-contents-column">
                  <div className="center-contents-column">
                    <div className="extra-bold-m dark-blue-color font-size-25">
                      {title}
                    </div>
                    <div className="medium-m issue-intro"> {intro} </div>
                  </div>
                </div>
              </div>

              {(planks || [])
                .map((plank, idx) => <Plank {...plank} index={idx} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const IssuePage = props => {
  console.log(props)
  const data = props.data.allMarkdownRemark.edges[0].node

  return <IssuePageTemplate {...data} />
}

IssuePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IssuePage

export const pageQuery = graphql`
  query IssueQuery {
    allMarkdownRemark(
      filter: { frontmatter: { uniq: { eq: "issue-index" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            header
            subheader
            bannerBackgroundImage
            bannerText
            sections {
              title
              icon
              intro
              planks {
                title
                contents
              }
            }
          }
        }
      }
    }
  }
`

const Divider = () => <div className="divider" />
