import React from "react";

export default class Question extends React.Component {
  state = {};

  render() {
    const { setData, question, value, error } = this.props;
    const { label, type, name, width, required } = question;
    return (
      <div className={getWidthClass(width)} style={{ flexDirection: "column" }}>
        <label>
          {label}
          {required && "*"}
        </label>
        {error && <label style={{ color: "#d5176e" }}> {error} </label>}
        {this.renderInput(type, name, value, error, setData)}
      </div>
    );
  }

  renderInput(type, name, value, error, setData) {
    let result;
    const inputStyle = Object.assign({}, baseInputStyle);
    if (error) {
      inputStyle.border = "1px solid #d5176e";
    }

    switch (type) {
      case "input":
        result = (
          <input
            required={true}
            type="text"
            name={name}
            value={value}
            style={inputStyle}
            onChange={setData}
          />
        );
        break;
      case "textarea":
        result = (
          <textarea
            required={true}
            value={value}
            name={name}
            style={inputStyle}
            onChange={setData}
          />
        );
        break;
      case "email":
        result = (
          <input
            required={true}
            type="email"
            value={value}
            name={name}
            style={inputStyle}
            onChange={setData}
          />
        );
        break;
      case "tel":
        result = (
          <input
            required={true}
            type="tel"
            value={value}
            name={name}
            style={inputStyle}
            onChange={setData}
          />
        );
        break;
      case "district":
        result = (
          <input
            required={true}
            type="text"
            name={name}
            value={value}
            style={inputStyle}
            onChange={setData}
          />
        );
        break;
      case "state":
        result = (
          <select required={true} onChange={setData} value={value}>
            {states.map(s => (
              <option>{s} </option>
            ))}
          </select>
        );
        break;
      case "checkbox":
        result = (
          <div>
            <input
              type="checkbox"
              name={name}
              value={value}
              style={inputStyle}
              onChange={setData}
            />
          </div>
        );
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

const baseInputStyle = {
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
