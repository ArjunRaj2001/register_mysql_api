let register = require("../model/registerSchema");

function insertUser(user, callback) {
  console.log(user, "DBUSER");
  try {
    let result = new register(user);

    // console.log(result);
    result.save();
    // console.log(result, "DB RESULT"); 
    callback(null, result);
  } 
  catch (error) {
    // console.log(error);
    callback(error);
  }
}

// async function insertUser(EmailId,FirstName,LastName,Password,DoB,PhoneNum,callback){
//     console.log(user,"DBUSER");
//     try{
//         let result=new register({EmailId,FirstName,LastName,Password,DoB,PhoneNum});
//         await result.save();
//         console.log(result);
//         callback(null,result)
//     }
//     catch(error){
//         console.log(error);
//         callback(error)
//     }
// }

module.exports = { insertUser };
