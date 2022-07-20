const mongoose = require("mongoose");
const bcrypt  = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',function(next){
  if(this.isModified('password')){
    bcrypt.hash(this.password,8,(err,hash)=>{
      if(err) return next(err);
      this.password = hash;
      next();
    })
  }
})


userSchema.comparePassword =async function (password) { 
  if(password) throw new Error('Password is missing,cant compare');

  try{
    const result = await bcrypt.compare(password,this.password)
    return result;
  }
  catch(err){
    console.log('error while comparing password',err.message)

  }
 }

// tell mongoose that User is a model and needs to be exported
const User = mongoose.model("User", userSchema);

module.exports = User;
