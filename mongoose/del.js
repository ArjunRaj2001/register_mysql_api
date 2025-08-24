const register = require('../model/registerSchema');

async function deleteUser (EmailId,callback){
    try {
        let result = await register.deleteOne({"EmailId":EmailId});
        // console.log(result);
        callback(null,result)
      } 
      catch (error) {
        // console.log(error);
        callback(error)
      }
}

module.exports={deleteUser}
