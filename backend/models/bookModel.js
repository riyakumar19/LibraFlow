import mongoose from "mongoose"

const issuedSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        issuedDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
    }
);

const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required : true,
        },
        author: {
            type: String,
            required : true,
        },
        publishYear: {
            type: Number,
            required : true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        issuedTo: [issuedSchema],
        issuedCount: {
            type: Number,
            default: 0, 
        },
    },
    {
        timestamps: true,
    }
);
export const Book = mongoose.model('Book', bookSchema)