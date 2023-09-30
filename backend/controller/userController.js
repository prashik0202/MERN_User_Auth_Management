import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @description Auth user and get token
 * @route POST /api/users/auth
 * @access public
 */
const authUser = expressAsyncHandler(async(req,res) => {
  // res.json({ message : "Success!"});
  const { email , password } = req.body;
  const user = await User.findOne({email});
  if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    res.json({
      _id : user._id,
      name : user.name,
      email : user.email
    })
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password')
  }
});

/**
 * @description Register new user 
 * @route POST /api/users
 * @access public
 */
const registerUser = expressAsyncHandler(async(req,res) => {
  // res.json({ message : "Register User!"});
  const { name , email , password } = req.body;

  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400);
    throw new Errow('User Already Exists');
  }

  const user = await User.create({
    name ,email, password
  });

  generateToken(res, user._id);

  if(user){
    res.status(201).json({
      _id : user._id,
      name : user.name,
      email : user.email
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @description Logout User
 * @route POST /api/users/logout
 * @access public
 */
const logoutUser = expressAsyncHandler(async(req,res) => {
  // res.json({ message : "Logout User"});
  res.cookie('jwt' , '' , {
    httpOnly : true,
    expires : new Date(0)
  });

  res.status(200).json({ message : 'Logged out successfully!'})
});

/**
 * @description get user profile
 * @route GET /api/users/profile
 * @access private
 */
const getUserProfile = expressAsyncHandler(async(req,res) => {
  // res.json({ message : "get User"});
  if(req.user) {
    res.json({
      _id : req.user._id,
      name : req.user.name,
      email : req.user.email
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

/**
 * @description update user details
 * @route PUT /api/users/profile
 * @access private
 */
const updateUserProfile = expressAsyncHandler(async(req,res) => {
  // res.json({ message : "Success!"});
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id : updatedUser._id,
      name : updatedUser.name,
      email : updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found!')
  }

});

export { authUser, registerUser , logoutUser , getUserProfile , updateUserProfile } ;