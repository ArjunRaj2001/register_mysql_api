let register = require("../model/registerSchema");

async function selectUser(EmailId, callback) {
  try {
    let result = await register.find({EmailId:EmailId},{Password:0});
    // console.log(result);
    callback(null, result);
  } 
  catch (error) {
    // console.log(error);
    callback(error);
  }
}
async function selectMail(EmailId, callback) {
  try {
    let result = await register.find({ EmailId: EmailId });
    // console.log(result,"DB REsILT");
    return callback(null, result);
  } 
  catch (error) {
    // console.log(error);
    return callback(error);
  }
}

module.exports = { selectUser, selectMail };
