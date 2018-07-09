exports.handler = (event, content, callback) => {
  console.log("Event");
  console.log(event);
  console.log("Content");
  console.log(content);

  return callback(null, {
    statusCode: 200,
    body: "OK"
  });
};
