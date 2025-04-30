import express from 'express';
import userRouters from './routes/userRouters.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import habitRouters from './routes/habitRouters.js'
dotenv.config()
const port = process.env.PORT;


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRouters)
app.use('/api',habitRouters)
app.get('/',(req,res) => {
     res.send('API is running ....')
});

app.use(notFound);
app.use(errorHandler);

app.listen(port,() => console.log(`Server started on port ${port}`))

