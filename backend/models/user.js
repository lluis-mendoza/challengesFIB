
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, index: {unique:true}},
    score: { type: Number, default: 0 },
    challenges:[   {challenge: {type: Schema.Types.ObjectId, ref: 'Challenge'}}   ]
  }
);

module.exports = mongoose.model('User', UserSchema);