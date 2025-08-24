let jwt = require("jsonwebtoken");

function generateToken(user, callback) {
  let token = jwt.sign({ user }, "12345", { expiresIn: "1h" });
  console.log(token);
  callback(token);
}

function successStatus(message, result) {
  return {
    status: true,
    message: message,
    result: result,
  };
}
function errorStatus(message) {
  return {
    status: false,
    message: message,
  };
}
module.exports = { successStatus, errorStatus, generateToken };
