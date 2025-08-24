let helperFile = require("../helperfile");
let message = require("../message");
let update = require("../mongoose/update");
let select = require("../mongoose/select");
// let emailReg=require('../model/registerSchema')
let async = require("async");
// let bcrypt=require('bcrypt')

function editeUser(req, res) {
  let { EmailId, FirstName, LastName, Password, DoB, PhoneNum } = req.body;
  let { user } = req;
  // console.log(user,"REQ BODY");
  if (
    (typeof EmailId === undefined || EmailId == "" || EmailId == null) &&
    (typeof FirstName === undefined || FirstName == " " || FirstName == null) &&
    (typeof LastName === undefined || LastName == " " || LastName == null) &&
    (typeof Password === undefined || Password == " " || Password == null) &&
    (typeof DoB === undefined || DoB == " " || DoB == null) &&
    (typeof PhoneNum === undefined || PhoneNum == " " || PhoneNum == null)
  ) {
    return res.json(helperFile.errorStatus(message.notUpdate));
  }

  if (EmailId) {
    if (EmailId.length <= 8 || EmailId.length >= 40) {
      return res.json(helperFile.errorStatus(message.mailLength));
    } 
    else {
      let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(EmailId)) {
        return res.json(helperFile.errorStatus(message.mailInvalid));
      }
    }
  }

  if (FirstName) {
    if (FirstName.length <= 2 || FirstName.length > 12) {
      return res.json(helperFile.errorStatus(message.fnLength));
    }
  }

  if (LastName) {
    if (LastName.length <= 2 || LastName.length > 12) {
      return res.json(helperFile.errorStatus(message.lnLength));
    }
  }

  if (Password) {
    if (Password.length <= 2 || Password.length > 12) {
      return res.json(helperFile.errorStatus(message.passLength));
    }
  }

  if (DoB) {
    if (DoB.length < 9 || DoB.length > 12) {
      return res.json(helperFile.errorStatus(message.dobLength));
    }
  }

  if (PhoneNum) {
    if (PhoneNum.length < 10 || PhoneNum.length >= 14) {
      return res.json(helperFile.errorStatus(message.phoneLength));
    }
  }
  
  let id = user._id;

  async.waterfall(
    [
      function checkMail(sts) {
        select.selectMail(EmailId, (err, result) => {
          if (err) {
            return sts(err);
          } else {
            // let id=usesr._id;
            return sts(null, id, result);
          }
        });
      },
      function UpdateUser(id, result, sts) {
        // console.log(user._id ,"TokenId",result.length,"ResultId");
        if (result.length !== 0 && result[0].id !== id) {
          return sts(message.mailExist);
        } else {
          update.updateDetails(id,EmailId,FirstName,LastName,Password,DoB,PhoneNum,(err, result)=> {
              if (err) {
                return sts(err);
              }
              else{
                return sts(null, result);
                // console.log(result,"result2");
              }
            }
          );
        }
      },
    ],
    function sts(error, result) {
      if (error) {
        return res.json(helperFile.errorStatus(error));
      }
      else{
        // console.log(result,"result3");
        return res.json(helperFile.successStatus(message.update, result));
      }
    }
  );
}

module.exports = { editeUser };
