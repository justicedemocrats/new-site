const email_regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const non_numbers = /.*[A-Za-z].*/;

const one = ({ name, value, type, required }) => {
  if (!required && (value == "" || value == null)) return undefined;

  if (
    ["input", "textarea", "email", "tel", "state", "dropdown"].includes(type)
  ) {
    if (value == "" || value == null) {
      return `${name} is a required field`;
    }
  }

  if (type === "email") {
    if (!email_regex.test(value)) {
      return `${name} must be a valid email`;
    }
  }

  if (type === "tel") {
    if (non_numbers.test(value)) {
      return `${name} must not have any letters`;
    }
  }

  return undefined;
};

const all = questions => {
  const errors = questions
    .map(q => Object.assign({}, q, { error: one(q) }))
    .filter(({ name, error }) => error !== undefined)
    .reduce(
      (acc, { name, error }) => Object.assign(acc, { [name]: error }),
      {}
    );

  if (Object.keys(errors).length == 0) {
    return undefined;
  }

  return errors;
};

module.exports = all;
