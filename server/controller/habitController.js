import asyncHandler from 'express';
import Habit from '../Models/habitModel.js';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';


const verifyToken = (req,res,next) => {
     const token = req.cookies.token;
     if(!token){
          return res.status(401).json({
               status:401,
               error:"Unauthorized : Missing token"
          })
     }
     try{
          const decodedToken = jwt.verify(token,process.env.JWT_SECERT);
          req.userId = decodedToken.id 
          next();
     }
     catch(error){
          return res.status(401).json({
               status:401,
               error:'Unauthorized: Invalid token'
          })
     }
}

// @desc Post user habits 
// @route POST /api/users/habits
// @access Private

const addHabit = asyncHandler(async ( req,res) => {
     const {habit_name,isCompleted } = req.body;
     if(!habit_name || !isCompleted){
          return res.status(400).json({
               status:400,
               error:'Habit Name and Emoji are required'
          })
     }
     const newHabit = new Habit({
          userId : req.userId,
          habit_name,
          isCompleted
     })
     await newHabit.save();

     const updateUser = await User.findByIdAndUpdate(
          req.userId,
          {$push: {habits: newHabit._id}},
          {new: true}
     );
     res.status(201).json({message:'Habit added successfully', user: updateUser})
})


// @desc GET user habits 
// @route GET /api/users/habits
// @access Private

const getHabit = asyncHandler(async (req,res) => {
     const user = await User.findById(req.userId).populate('habits')
     if(!user){
          return res.status(401).json({
               status:404,
               error:"User not found"
          })
     }
     res.status(200).json({habits:user.habits})
})

// @desc Delete user habits by Id
// @route DELETE /api/users/habits/:habitId
// @access Private

const deleteHabit = asyncHandler(async (req,res) => {
     const habitId = req.params.habitId;
     if(!isValidObjectId(habitId)){
          return res.status(404).json({
               status:404,
               error:'Something has gone wrong'
          })
     }
     await User.findByIdAndUpdate(req.userId,{$pull : {habits:habitId}},)
     res.status(200).json({message:'Habit deleted successfully'})
});
// @desc Update user habits by ID
// @route PUT /api/users/habits/:habitId
// @access Private

const updateHabit = asyncHandler(async (req,res) => {
     const habitId = req.params.habitId;
     if(!isValidObjectId(habitId)){
          return res.status(404).json({
               status:404,
               error:'Something has gone wrong'
          })
     }
     
     const {habit_name,isCompleted} = req.body 
     
     const updatedHabit = await Habit.findByIdAndUpdate(
          habitId,
          {habit_name,isCompleted},
          {new:true}
     )
     if(!updatedHabit){
          return res.status(404).json({
               status:404,
               error:'Something has gone wrong'
          })
     }
     res.status(200).json({message:"Habit update successfully",habit:updatedHabit})
})


export {
     addHabit,
     getHabit,
     deleteHabit,
     updateHabit,
     verifyToken
}