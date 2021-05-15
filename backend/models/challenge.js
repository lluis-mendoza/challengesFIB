const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema(
  {
    name:{type:String, required: true},
    code:{type:String,required: true,index: {unique:true}, select: false},
    description:{type:String, required: true},
    points:{type:Number, required:true},
    image:{type:String, required: true}
  }
);

module.exports = mongoose.model('Challenge', ChallengeSchema);