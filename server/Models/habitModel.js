import mongoose, { mongo } from 'mongoose';
const habitSchema = new mongoose.Schema({
     habit_name: {
         type: String,
         required: true,
     },
     isCompleted: {
         type: Boolean,
     },
     daily_check: {
         type: [{
             date: {
                 type: Date,
                 required: true
             },
             count: {
                 type: Number,
                 default: 0
             }
         }],
         required: true
     }
 }, {
     timestamps: true 
 });
const Habit = mongoose.model('Habit',habitSchema);
export default Habit;