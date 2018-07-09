exports.handler = (event, content, callback) => {
  console.log("Event");
  console.log(event);

  return callback(null, {
    statusCode: 200,
    body: "OK"
  });
};
