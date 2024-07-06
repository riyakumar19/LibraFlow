import express from "express";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
const router = express.Router()

router.get('/', async (req,res)=>{
    try{
        const books = await Book.find({ issuedCount: { $gte: 1 } });
        return res.status(200).json({
            count: books.length,
            data : books
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
})
router.get('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id).populate('issuedTo.userId', 'name phone email rollNo'); 

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({
            data: book
        });
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
})
router.post('/return/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rollNo } = req.body;

        const user = await User.findOne({ rollNo });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const issuedIndex = book.issuedTo.findIndex(
            (issue) => issue.userId.toString() === user._id.toString()
        );

        if (issuedIndex === -1) {
            return res.status(400).json({ message: 'This book was not issued to this user' });
        }

        book.issuedTo.splice(issuedIndex, 1);
        book.quantity += 1;
        book.issuedCount -= 1;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
export default router