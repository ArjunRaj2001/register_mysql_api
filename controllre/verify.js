let selected = require("../mongoose/select");
let helperFile = require("../helperfile.js");
let message = require("../message");

function verifyUser(req, res) {
  let { user } = req;
  // console.log(user,"VERIFYUSER");
  let Email = user.EmailId;
  selected.selectUser(Email, (err, result) => {
    if (err) {
      res.json(helperFile.errorStatus(err));
    } 
    else {
      // console.log(result);
      res.json(helperFile.successStatus(message.verify, result));
    }
  });
}
module.exports = { verifyUser };
