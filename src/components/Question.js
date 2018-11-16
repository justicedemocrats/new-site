import React from "react";

export default class Question extends React.Component {
  state = {};

  editCosigner = (idx, attr) => ev => {
    const cosigner = Object.assign(
      {},
      (this.props.value && this.props.value[idx]) || {}
    );
    cosigner[attr] = ev.target.value;
    const new_cosigners = (this.props.value || []).slice(0);
    new_cosigners[idx] = cosigner;
    this.props.setData({ target: { value: new_cosigners } });
  };

  addCosigner = () => {
    const value = (this.props.value || []).slice(0);
    value.push({});
    this.props.setData({ target: { value: value } });
  };

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
        break;
      case "cosigners":
        result = (
          <div>
            {!value && (
              <div style={{ display: "flex" }}>
                <div>
                  <label> Name </label>
                  <input
                    type="text"
                    name="name"
                    value={value && value[0].name}
                    onChange={this.editCosigner(0, "name")}
                  />
                </div>
                <div>
                  <label> Email </label>
                  <input
                    type="email"
                    name="email"
                    value={value && value[0].email}
                    onChange={this.editCosigner(0, "email")}
                  />
                </div>
                <div>
                  <label> Zip </label>
                  <input
                    type="text"
                    maxLength="5"
                    name="zip"
                    value={value && value[0].zip}
                    onChange={this.editCosigner(0, "zip")}
                  />
                </div>
              </div>
            )}

            {value &&
              value.map((v, idx) => (
                <div style={{ display: "flex" }}>
                  <div>
                    <label> Name </label>
                    <input
                      key={`${idx}-name`}
                      type="text"
                      name="name"
                      value={value && value[idx].name}
                      onChange={this.editCosigner(idx, "name")}
                    />
                  </div>

                  <div>
                    <label> Email </label>
                    <input
                      key={`${idx}-email`}
                      type="email"
                      name="email"
                      value={value && value[idx].email}
                      onChange={this.editCosigner(idx, "email")}
                    />
                  </div>

                  <div>
                    <label> Zip </label>
                    <input
                      type="text"
                      key={`${idx}-zip`}
                      maxLength="5"
                      name="zip"
                      value={value && value[idx].zip}
                      onChange={this.editCosigner(idx, "zip")}
                    />
                  </div>
                </div>
              ))}

            {value && value.length < 3 && (
              <button className="button" onClick={this.addCosigner}>
                &#65291; Add Cosigner
              </button>
            )}
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
