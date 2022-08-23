const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validate email and password
  if (!email || !password) {
    throw new Error('Please provide an email and password');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Please provide a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Please use a strong password, at least 8 characters, 1 uppercase, 1 lowercase, 1 number'
    );
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validate email and password
  if (!email || !password) {
    throw new Error('Please provide an email and password');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Email not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
