import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(value) {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value);
      },
      message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
    },
    trim: true
  }
});


const User = mongoose.model('User', userSchema);
export default User;
