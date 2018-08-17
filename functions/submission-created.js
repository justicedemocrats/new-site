import request from "axios";

const ensureEndingSlash = url => (url.endsWith("/") ? url : `${url}/`);
const ensureNoBeginningSlash = url =>
  url.startsWith("/") ? url.slice(1) : url;
const ensureNoBeginningRest = url => url.replace("/rest/v1/", "");

const ensureSlashes = url =>
  ensureEndingSlash(ensureNoBeginningSlash(ensureNoBeginningRest(url)));

const processUrl = url => {
  return `${process.env.AK_BASE}/${ensureSlashes(url)}`;
};

exports.handler = async (event, context) => {
  console.log("Function running...");

  try {
    const body = Object.assign(
      {
        page: "signup-justice-democrats"
      },
      JSON.parse(event.body)
    );

    console.info(`Sending body: ${JSON.stringify(body)}`);

    const resp = await request.post(processUrl("/action"), body, {
      auth: {
        username: process.env.AK_USERNAME,
        password: process.env.AK_PASSWORD
      }
    });

    console.info(`Got resp: ${JSON.stringify(resp.body)}`);
    return {
      statusCode: 200,
      body: "OK"
    };
  } catch (ex) {
    console.error(ex);

    return {
      statusCode: 500,
      body: "ERROR"
    };
  }
};
