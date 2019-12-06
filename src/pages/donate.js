import React from "react";
import store from "store";

const DEFAULT_DONATE_URL =
  "https://secure.actblue.com/donate/justicedemocrats?refcode=website";

export default class DonateRedirect extends React.Component {
  componentDidMount() {
    const destinationUrl =
      store.get("redirect_destination") || DEFAULT_DONATE_URL;
    store.remove("redirect_destination");
    window.location.href = destinationUrl;
  }

  render() {
    return <div />;
  }
}
