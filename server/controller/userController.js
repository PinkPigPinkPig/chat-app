const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body

  const isNotValid = !name || !email || !password

  if (isNotValid) {
    res.status(400)
    throw new Error("Please Enter all the Fields")
  }

  const isUserExist = await User.findOne({ email })

  if (isUserExist) {
    res.status(400)
    throw new Error("User already exists")
  }

  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400)
    throw new Error("Failed to Create the User")
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
    const isPasswordCorrect = await user.matchPassword(password)
  if (user && isPasswordCorrect) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    })
  }
})

module.exports = { registerUser, authUser }
