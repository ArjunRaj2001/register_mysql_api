let register = require("../model/registerSchema");

async function updateDetails(id,EmailId,FirstName,LastName,Password,DoB,PhoneNum,callback){
  try {
    let result = await register.findOneAndUpdate({ _id: id },{$set: {
          EmailId: EmailId,
          FirstName: FirstName,
          LastName: LastName,
          Password: Password,
          DoB: DoB,
          PhoneNum: PhoneNum,
        },
      },
      { new: true }
    );
    // console.log(result, "DB Reusult");
    if(Password){
      await result.save();
    }
    return callback(null, result);
  } 
  catch (error) { 
    // console.log(error);
    return callback(error);
  }
}
module.exports = { updateDetails };

// result.findOneAndUpdate(`{_id: "${id}" },
//   {EmailId:"${Anuj}",FirstName:"${FirstName}",LastName:"${LastName}",Password:"${Password}",DoB:"${DoB}",PhoneNum:"${Phonen}"}`, null, function (err, docs) {
//   if (err){
//       console.log(err)
//   }
//   else{
//       console.log("Original Doc : ",docs);
//   }
// });
//  }
// module.exports={updateDetails}
// const register = require('../model/registerSchema');

// async function updateDetails(id, EmailId, FirstName, LastName, Password, DoB, PhoneNum, callback) {
//     try {

//         let result = await register.findById(id);

//         if (EmailId) result.EmailId = EmailId;
//         if (FirstName) result.FirstName = FirstName;
//         if (LastName) result.LastName = LastName;
//         if (Password) result.Password = Password;
//         if (DoB) result.DoB = DoB;
//         if (PhoneNum) result.PhoneNum = PhoneNum;

//          await result.save();

//         return callback(null, result);
//     } catch (error) {
//         return callback(error);
//     }
// }

// module.exports = { updateDetails };
