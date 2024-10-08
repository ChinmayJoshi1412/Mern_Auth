import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config();

connectDB();



const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's domain
}));


app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/users',userRoutes);

app.get('/',(req,res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
});