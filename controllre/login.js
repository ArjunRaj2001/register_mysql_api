let bcrypt = require("bcrypt");
let select = require("../mongoose/select");
let helperFile = require("../helperfile");
let async = require("async");
let message = require("../message");

function loginUser(req, res) {
  let { EmailId, Password } = req.body;
  // console.log(EmailId, Password);

  if (typeof EmailId === undefined || EmailId == "" || EmailId == null) {
    return res.json(helperFile.errorStatus(message.mailReq));
  } 
  else if (EmailId.length <= 8 || EmailId.length >= 40) {
    return res.json(helperFile.errorStatus(message.mailLength));
  }
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(EmailId)) {
    return res.json(helperFile.errorStatus(message.mailInvalid));
  }

  if (typeof Password === undefined || Password == " " || Password == null) {
    return res.json(helperFile.errorStatus(message.passRequire));
  } 
  else if (Password.length < 2 || Password.length > 12) {
    return res.json(helperFile.errorStatus(message.passLength));
  }

  async.waterfall(
    [
      function usersSelect(sts) {
        select.selectMail(EmailId, (error, result) => {
          if (error) {
            sts(error);
          }
          sts(null, result);
          // console.log(result,"result 1");
        });
      },
      function tokenVeriy(result, sts) {
        if (result.length > 0) {
          let user = result[0];
          // console.log(Password, user.Password,"result 2");
          bcrypt.compare(Password, user.Password, (err, match) => {
            if (err) {
              sts(err);
            }
            // console.log(match,"Matc");
            if (match) {
              helperFile.generateToken(user, (result) => {
                // console.log ("Login Successfully", result);
                sts(null, result);
                // console.log(result,"Resutl3");
              });
            } 
            else {
              sts(message.passWorng);
            }
          });
        } 
        else {
          sts(message.mailWrong);
        }
      },
    ],
    function sts(err, result) {
      if (err) {
        return res.json(helperFile.errorStatus(err));
      }
      return res.json(helperFile.successStatus(message.log, result));
    }
  );
}
module.exports = { loginUser };
