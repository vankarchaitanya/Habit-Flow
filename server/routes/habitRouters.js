 import express from 'express';
 import {
    getHabit,
    addHabit,
    deleteHabit,
    verifyToken,
    updateHabit
 } from '../controller/habitController.js'
const router = express.Router();

router
    .route('/habits')
    .post(verifyToken,addHabit)
    .get(verifyToken,getHabit);

router 
    .route('/habits/:habitId')
    .delete(verifyToken,deleteHabit)
    .put(verifyToken,updateHabit);

export default router;

