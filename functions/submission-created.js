exports.handler = (event, content, callback) => {
  return callback(null, {
    statusCode: 200,
    body: "OK"
  });
};
