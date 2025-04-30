import asyncHandle from 'express-async-handler';
import User from '../Models/userModel.js'
import generateToken from '../utils/generateToken.js'
// @desc Auth user/set token
// route Post  /api/ refresh token 
// @ access Public
const authUser = asyncHandle( async ( req, res) => {
     const {email,password} = req.body;

     const user = await User.findOne({email})

     if(user && (await user.matchPassword(password))){
          generateToken(res,user._id);
          res.status(201).json({
               _id:user._id,
               name:user.name,
               email:user.email
          })
     }else{
          res.status(401);
          throw new Error('Invaild email or passord')
     }

});


// @desc Register a new user 
// @route POST /api/users
// @access Public
const registerUser = asyncHandle( async ( req, res) => {
     const {name,email,password} = req.body;
     const userExists = await User.findOne({email})

     if(userExists){
          res.status(400);
          throw new Error ('User already exists');
     }

     const user = await User.create({
          name,
          email,
          password
     });

     if(user){
          generateToken(res, user._id)
             if(!res.headersSent){
               res.status(201).json({
                    _id : user._id,
                    name:user.name,
                    email:user.email
               })
             }
          }
     else {
          if(!res.headersSent){
               res.status(400);
               throw new Error('Invalid user data')
          }
     }
     if(!res.headersSent){
          res.status(200).json({message: 'Register User'})
     }
})

// @desc logout 
// @route POST /api/users/logout
// @access Public
const logoutUser = (req,res) => {
     res.cookie('jwt','',{
          httpOnly:true,
          expires: new Date(0)
     })
     if(!res.headersSent){
          res.status(200).json({message:'Logged out Sucessfully'})
     }

}

// @desc get user profile
// @route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandle(async (req,res) => {
     const user = await User.findById(req.user._id);

     if(user){
          if(!res.headersSent){
               res.json({
                    _id:user._id,
                    name:user.name,
                    email:user.email
               })
          }
     }else {
          if(!res.headersSent){
               res.status(404);
          throw new Error('User not found')
          }
     }
})

// @desc update user profile
// @route POST /api/users/profile
// @access Private
const updateUserProfile = asyncHandle(async (req,res) => {
     const user = await User.findById(req.user._id);

     if(user){
          user.name = req.body.name || user.name,
          user.email = req.body.email || user.email
          if(req.body.password){
               user.password = req.body.password;
          }
          const updatedUser = await user.save()

         if(!res.headersSent){
          res.json({
               _id:updatedUser._id,
               name:updatedUser.name,
               email:updatedUser.email
          });
         }
     }else {
          if(!res.headersSent){
               res.status(404);
               throw new Error('User not found')
          }
     }

})

export {  authUser, 
          registerUser,
          logoutUser,
          getUserProfile,
          updateUserProfile
} 