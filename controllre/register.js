let helperFile = require("../helperfile");
let message = require("../message");
let insert = require("../mongoose/insert");
let select = require("../mongoose/select");
let async = require("async");
// let bcrypt=require('bcrypt')

function registerUser(req, res) {
  let { EmailId, FirstName, LastName, Password, DoB, PhoneNum } = req.body;
  let user = req.body;
  // console.log(user, "REQ BODY");
  
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

  if (typeof FirstName === undefined || FirstName == " " || FirstName == null) {
    return res.json(helperFile.errorStatus(message.fnRequire));
  } 
  else if (FirstName.length <= 2 || FirstName.length > 12) {
    return res.json(helperFile.errorStatus(message.fnLength));
  }

  if (typeof LastName === undefined || LastName == " " || LastName == null) {
    return res.json(helperFile.errorStatus(message.lnRequire));
  } 
  else if (LastName.length <= 2 || LastName.length > 12) {
    return res.json(helperFile.errorStatus(message.lnLength));
  }

  if (typeof Password === undefined || Password == " " || Password == null) {
    return res.json(helperFile.errorStatus(message.passRequire));
  } 
  else if (Password.length <= 2 || Password.length > 12) {
    return res.json(helperFile.errorStatus(message.passLength));
  }
  
  if (typeof DoB === undefined || DoB == " " || DoB == null) {
    return res.json(helperFile.errorStatus(message.dobRequire));
  } 
  else if (DoB.length < 9 || DoB.length > 12) {
    return res.json(helperFile.errorStatus(message.dobLength));
  }

  if (typeof PhoneNum === undefined || PhoneNum == " " || PhoneNum == null) {
    return res.json(helperFile.errorStatus(message.phoneRequire));
  } 
  else if (PhoneNum.length < 10 || PhoneNum.length >= 14) {
    return res.json(helperFile.errorStatus(message.phoneLength));
  }

  async.waterfall(
    [
      function checkMail(sts) {
        select.selectMail(EmailId, (err, result) => {
          if (err) {
            sts(err);
          }
          sts(null, result);
          // console.log(result,"result1");
        });
      },
      function regUser(result, sts) {
        if (result.length !== 0) {
          sts(message.mailExist);
        } 
        else {
          insert.insertUser(user, (err, result) => {
            if (err) {
              sts(err);
            }
            else{
              sts(null, result);
              // console.log(result,"result2");
            }
          });
        }
      },
    ],
    function sts(error, result) {
      if (error) {
        return res.json(helperFile.errorStatus(error));
      }
      else{
        // console.log(result,"result3");
        return res.json(helperFile.successStatus(message.add, result));
    
      }
      }
  );
}

module.exports = { registerUser };
