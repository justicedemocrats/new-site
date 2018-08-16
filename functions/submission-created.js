import request from "superagent";

const ensureEndingSlash = url => (url.endsWith("/") ? url : `${url}/`);
const ensureNoBeginningSlash = url =>
  url.startsWith("/") ? url.slice(1) : url;
const ensureNoBeginningRest = url => url.replace("/rest/v1/", "");

const ensureSlashes = url =>
  ensureEndingSlash(ensureNoBeginningSlash(ensureNoBeginningRest(url)));

const constructApi = ({ base, username, password }) => {
  const processUrl = url => {
    return `${base}${ensureSlashes(url)}`;
  };

  return {
    get: url => request.get(processUrl(url)).auth(username, password),
    post: url => request.post(processUrl(url)).auth(username, password),
    put: url => request.put(processUrl(url)).auth(username, password),
    delete: url => request.delete(processUrl(url)).auth(username, password)
  };
};

exports.handler = (event, content, callback) => {
  const api = constructApi({
    base: process.env.AK_BASE,
    username: process.env.AK_USERNAME,
    password: process.env.AK_PASSWORD
  });

  console.log("Function running...");

  const body = Object.assign(
    {
      page: "signup-justice-democrats"
    },
    JSON.parse(event.body)
  );

  console.log(`Sending body: ${JSON.stringify(body)}`);

  api
    .post("/action")
    .send(body)
    .then(resp => {
      console.log(`Got resp: ${JSON.stringify(resp.body)}`);
      return callback(null, {
        statusCode: 200,
        body: "OK"
      });
    })
    .catch(err => {
      return callback(null, {
        statusCode: 500,
        body: "ERROR"
      });
    });
};
