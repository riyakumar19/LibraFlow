import express from "express";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
const router = express.Router()


router.get("/", async (req, res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data : books
        });
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message});
    }
})
router.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message});
    }
})
router.patch("/:id", async (req, res) =>{
    try{
        if(
            !req.body.title &&
            !req.body.author &&
            !req.body.publishYear &&
            !req.body.quantity
        ){
            return res.status(400).send({message: "Please fill any of the the fields"});
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json({message: "Book updated successfully"});
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message});
    }
})
// FOR ADDING
router.post('/', async (req, res)=>{
    try{
        const { title, author, publishYear, quantity} = req.body;
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear ||
            !req.body.quantity
        ){
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        let existingBook = await Book.findOne({title, author, publishYear})
        if (existingBook) {
                existingBook.quantity += quantity;
                existingBook = await existingBook.save();
                return res.status(200).send(existingBook);
        }
        else{
            const newBook = {
                title: title,
                author: author,
                publishYear: publishYear,
                quantity: quantity
            };
            const book = await Book.create(newBook); 
            
            return res.status(201).send(book);
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
// FOR ISSUING BOOK
router.post('/issue/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const {name, phone, email, rollNo} = req.body;
        let user = await User.findOne({email});

        if (!user) {
            user = new User({ name, phone, email, rollNo });
            await user.save();
        }


        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.quantity <= 0) {
            return res.status(400).json({ message: 'No available copies of the book' });
        }
        if (!book.issuedTo) {
            book.issuedTo = [];
        }
        const alreadyIssued = book.issuedTo.find(issue => issue.userId.toString() === user._id.toString());
        if (alreadyIssued) {
            console.log("no problem")
            return res.status(400).json({ message: 'One copy has already been issued' });
        }
        book.quantity -= 1;
        book.issuedCount += 1;

        book.issuedTo.push({ userId: user._id, issuedDate: new Date() });
        await book.save();
        res.status(200).json({ message: 'Book issued successfully' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})
// FOR RETURNING BOOK

router.delete("/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json({message: "Book deleted successfully"});
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

export default router;