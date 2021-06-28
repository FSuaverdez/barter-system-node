const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    username: {
      type: String,
      required: [true, 'Please enter an username'],
    },
    firstName: {
      type: String,
      required: [true, 'Please enter your First Name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your Last Name'],
    },
    address: {
      type: String,
      required: [true, 'Please enter your address'],
    },
    contactNo: {
      type: String,
      required: [true, 'Please enter your Contact Number'],
    },
    gender: {
      type: String,
      required: [true, 'Please enter your Gender'],
    },
    age: {
      type: String,
      required: [true, 'Please enter your Age'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    isVerified: {
      type: Boolean,
      required: [true, 'boolean is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// fire a function before doc saved to db
// userSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt()
//   this.password = await bcrypt.hash(this.password, salt)
//   next()
// })

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User
