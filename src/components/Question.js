import React from "react";

export default class Question extends React.Component {
  state = {};

  render() {
    const { label, type, name, width } = this.props.question;
    return (
      <div className={getWidthClass(width)} style={{ flexDirection: "column" }}>
        <label>{label}</label>
        {this.renderInput(type, name)}
      </div>
    );
  }

  renderInput(type, name) {
    let result;

    switch (type) {
      case "input":
        result = (
          <input required={true} type="text" name={name} style={inputStyle} />
        );
        break;
      case "textarea":
        result = <textarea required={true} name={name} style={inputStyle} />;
        break;
      case "email":
        result = (
          <input required={true} type="email" name={name} style={inputStyle} />
        );
        break;
      case "tel":
        result = (
          <input required={true} type="tel" name={name} style={inputStyle} />
        );
        break;
      case "district":
        result = (
          <input required={true} type="text" name={name} style={inputStyle} />
        );
        break;
      case "state":
        result = (
          <select required={true}>
            {states.map(s => <option>{s} </option>)}
          </select>
        );
        break;
    }

    return result;
  }
}

function getWidthClass(width) {
  let result;

  switch (width) {
    case "full":
      result = "twelve columns";
      break;
    case "half":
      result = "six columns";
      break;
    case "quarter":
      result = "three columns";
      break;
  }

  return result;
}

const inputStyle = {
  width: "100%"
};

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];
