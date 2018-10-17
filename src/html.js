import React from "react";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      );
    }

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="google-site-verification" content="-jhrvT598jaA36zbZ6wjXo04JLa705-J9L8jm_GNE2s" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,800"
            rel="stylesheet"
          />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key="forms"
            dangerouslySetInnerHTML={{
              __html: `
              <form name="splash-signup" netlify netlify-honeypot="bot-field" method="post" action="/" hidden>
                <input type="text" name="name" required="true" />
                <input type="email" name="email" required="true" />
                <input type="text" maxlength="5" minlength="5" name="zip" required="true" />
                <input name="phone" type="tel" required="true" />
              </form>

              <form name="main-signup" netlify netlify-honeypot="bot-field" method="post" action="/donate" hidden>
                <input type="text" name="name" required="true" />
                <input type="email" name="email" required="true" />
                <input type="text" maxlength="5" minlength="5" name="zip" required="true" />
                <input name="phone" type="tel" required="true" />
              </form>`
            }}
          />
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
