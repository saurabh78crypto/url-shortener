import mongoose from 'mongoose';
import validator from 'validator';

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  longUrl: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Invalid URL']
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  }
});

const Url = mongoose.model('Url', urlSchema);
export default Url;
