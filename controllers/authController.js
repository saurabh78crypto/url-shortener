import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendOtpMail from '../utils/mailService.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ status: true, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ status: true, token });
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendOtpMail(email, otp);

    // Save OTP in Redis (not shown here)
    res.status(200).json({ status: true, message: 'OTP sent to your email' });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
    

export {signup, signin, forgetPassword};