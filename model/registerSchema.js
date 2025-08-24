const bcrypt= require('bcrypt');
let mongoose = require('mongoose');
// let helperFile=require('../helperfile');
// let message=require('../message')

let registerSchema = new mongoose.Schema({
  "EmailId": {type: String,lowercase: true, unique: true},
  "FirstName": {type:String},
  "LastName": {type:String},
  "Password":{type:String},
  "DoB":{type:String},
  "PhoneNum":{type:Number},
},
{ timestamps: { createdAt: 'Created',updatedAt: 'Updated'} });



registerSchema.pre('save', function(next) {
  try{
      // console.log(!this.isModified('Password'),this.isNew,"PReHooked");
      if(!this.isModified('Password')||this.isNew){
        let passHash =  bcrypt.hashSync(this.Password, 10);
        this.Password=passHash;
        // console.log(passHash,"Hash()ER");
       }
     next();
    }
    catch(error){
    return next(error);
}
});


let register = mongoose.model('register', registerSchema);
module.exports = register;