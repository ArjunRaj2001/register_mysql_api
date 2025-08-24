let helperFile = require("../helperfile");
let message = require("../message");
let del = require("../mongoose/del");

function delUser(req, res) {
  let { EmailId } = req.body;
  // console.log(EmailId);
  let { user } = req;

  if (typeof EmailId === undefined || EmailId == "" || EmailId == null) {
    return res.json(helperFile.errorStatus(message.mailReq));
  } 
  else if (EmailId.length <= 8 || EmailId.length >= 40) {
    return res.json(helperFile.errorStatus(message.mailLength));
  } 
  else {
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(EmailId)) {
      return res.json(helperFile.errorStatus(message.mailInvalid));
    }
  }

  let Email = user.EmailId;
  console.log(Email, "token Verified User");

  if (Email === EmailId) {
    del.deleteUser(Email, (err, result) => {
      if (err) {
        res.json(helperFile.errorStatus(err));
      } 
      else {
        // console.log(result);
        res.json(helperFile.successStatus(message.delete, result));
      }
    });
  } 
  else {
    res.json(helperFile.errorStatus(message.mailWrong));
  }
}
module.exports = { delUser };
