const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChallengeSchema = new Schema(
  {
    name:{type:String, required: true},
    code:{type:Number,required: true}
  }
);

module.exports = mongoose.model('Challenge', ChallengeSchema);