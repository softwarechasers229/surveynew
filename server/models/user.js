const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  about: {
    type: String,
    required: false
  }
});

UserSchema.set('timestamps', true);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;