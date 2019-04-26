const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;
const saltRounds = 10;

const userSchema = new Schema({
    email: String,
    password: String,
});

// userSchema.methods.encryptPassword = (password, callback) => {
//     var newHash;
//     bcrypt.genSalt(saltRounds, function(err, salt){
//         bcrypt.hash(password, salt, null, function(err, hash){
//             if(err){
//                 console.log("encryptPassword: ", err)
//             }
//             console.log("first Step passowrd", hash)
//             setTimeout(() => {
                
//                 callback(hash);
//             }, 5000);
//         })
//     })
// }

// userSchema.methods.comparePassword = function (password) {
//     bcrypt.compare(password, hash, function(err, res){
//         if(err){
//             console.log("comparePassword", err)
//         }
//         return res;
//     })
// }

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
   return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('users', userSchema)