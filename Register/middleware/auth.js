let jwt = require("jsonwebtoken");
let helperFile = require("../helperfile");
let message = require("../message");

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  // console.log(token,"TOker");
  if (!token) {
    return res.json(helperFile.errorStatus(message.noToke));
  }
  // console.log(token, "<<>>><<><><");
  try {
    let decoded = jwt.verify(token, "12345");

    // console.log(decoded.user, "@#@#");
    req.user = decoded.user;
    // feed.FeedCreate(decoded.user)
    // console.log(decoded.user,"token");
    next();
  } 
  catch (err) {
    res.json(helperFile.errorStatus(message.tokenWrong));
  }
}
module.exports = { verifyToken };
