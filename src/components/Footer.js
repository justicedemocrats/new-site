import React from 'react'

export default class Footer extends React.Component {
  render() {
    const {
      generalEmail,
      pressEmail,
      address,
      quickLinks,
      socialIcons,
      paidForMessage,
      copyright,
      phone,
    } = this.props

    return (
      <div>
        <div className="my-footer dark-blue-bg row" style={{ color: 'white' }}>
          <div className="footer-section six columns">
            <div className="footer-section-title extra-bold-m">Contact Us</div>
            <div className="footer-section-contents medium-m standard-text contact">
              <div>
                General:
                <a
                  href={`mailto:${generalEmail}`}
                  target="_blank"
                  className="bold-m"
                >
                  {generalEmail}
                </a>
              </div>

              <div>
                Press:
                <a
                  href={`mailto:${pressEmail}`}
                  target="_blank"
                  className="bold-m"
                >
                  {pressEmail}
                </a>
              </div>

              <div>
                Phone:
                <a href={`tel:${phone}`} target="_blank" className="bold-m">
                  {phone}
                </a>
              </div>

              <div>{address}</div>
            </div>
          </div>

          <div className="footer-section six columns">
            <div className="footer-section-title extra-bold-m">Quick Links</div>
            <div className="footer-section-contents quick-links standard-text">
              {quickLinks.map(({ text, url }) => (
                <a href={url} target="_blank" className="bold-m">
                  {text}
                </a>
              ))}
            </div>

            <div className="social-icons">
              {socialIcons
                .filter(({ type }) => type == 'social')
                .map(({ icon, url }) => (
                  <a href={url} target="_blank">
                    <img src={icon} />
                  </a>
                ))}

              <div className="icon-divider" />

              {socialIcons
                .filter(({ type }) => type == 'contact')
                .map(({ icon, url }) => (
                  <a href={url} target="_blank">
                    <img src={icon} />
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="disclaimer">
          <div className="medium-m dark-blue-color paid-for">
            {paidForMessage}
          </div>
          <div className="light-m dark-blue-color copyright">{copyright}</div>
        </div>
      </div>
    )
  }
}
