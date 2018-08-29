import React, { Component } from "react";

export default class NotFound extends Component {
  componentDidMount() {
    window.location.href = `https://jdems.us${window.location.pathname}`;
  }

  render() {
    return <div> NOT FOUND </div>;
  }
}
