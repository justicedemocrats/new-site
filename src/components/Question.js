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
    const { setData, question, value, error, otherData } = this.props;
    const { label, type, name, width, required } = question;
    return (
      <div className={getWidthClass(width)} style={{ flexDirection: "column" }}>
        <label style={{ fontSize: 14 }} className="medium-m">
          {label}
          {required && "*"}
        </label>
        {error && <label style={{ color: "#d5176e" }}> {error} </label>}
        {this.renderInput(type, name, value, error, setData, otherData)}
      </div>
    );
  }

  renderInput(type, name, value, error, setData, otherData) {
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
          <div className="center-contents-column">
            <select
              required={true}
              onChange={setData}
              value={value}
              disabled={typeof otherData.State !== "string"}
            >
              {states[otherData.State] == "00" && (
                <option value="00"> AL </option>
              )}
              {typeof states[otherData.State] == "string" &&
                new Array(parseInt(states[otherData.State]) + 1)
                  .fill(null)
                  .map((_, idx) =>
                    idx == 0 ? (
                      <option value=""> </option>
                    ) : (
                      <option value={`${idx}`.padStart(2, "0")}>
                        {`${idx}`.padStart(2, "0")}
                      </option>
                    )
                  )}
            </select>
            <a target="_blank" href="https://callyourrep.co/">
              Don't know your district?
            </a>
          </div>
        );
        break;
      case "state":
        result = (
          <select required={true} onChange={setData} value={value}>
            <option value="" />
            {Object.keys(states).map(s => (
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
  width: "100%",
  fontSize: 14
};

const states = {
  AK: "00",
  AL: "07",
  AR: "04",
  AZ: "09",
  CA: "53",
  CO: "07",
  CT: "05",
  DE: "00",
  FL: "27",
  GA: "14",
  HI: "02",
  IA: "04",
  ID: "02",
  IL: "18",
  IN: "09",
  KS: "04",
  KY: "06",
  LA: "06",
  MA: "09",
  MD: "08",
  ME: "02",
  MI: "14",
  MN: "08",
  MO: "08",
  MS: "04",
  MT: "00",
  NC: "13",
  ND: "00",
  NE: "03",
  NH: "02",
  NJ: "12",
  NM: "03",
  NV: "04",
  NY: "27",
  OH: "16",
  OK: "05",
  OR: "05",
  PA: "18",
  RI: "02",
  SC: "07",
  SD: "00",
  TN: "09",
  TX: "36",
  UT: "04",
  VA: "11",
  VT: "00",
  WA: "10",
  WI: "08",
  WV: "03",
  WY: "00"
};
