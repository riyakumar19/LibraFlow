import express from "express";
// import { PORT } from "./config.js";
// import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from './routes/booksRoutes.js';
import issuedBookRoutes from './routes/issuedBookRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json())
app.use('/books', bookRoutes)
app.use('/issuedBooks', issuedBookRoutes)
// app.get("/", (req, res) => {
//     return res.status(234).send("hiwhhdiw")
// });
const PORT = 5555;
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(PORT, (req, res)=>{
            console.log(`Server is running on port ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error)
    });