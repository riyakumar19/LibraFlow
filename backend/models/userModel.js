import mongoose from "mongoose";
import validatorPackage from "validator";
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim:true,
        },
        phone:{
            type: Number,
            required: true,
            unique : true,
            minLength:10,
            trim:true,
        },
        email:{
            type: String,
            required: true,
            unique : true,
            lowercase:true,
            trim:true,
            validate: {
                validator: validatorPackage.isEmail,
                message: 'Please provide a valid email',
            },
        },
        rollNo:{
            type: String,
            required: true,
            unique : true,
            trim:true,
        },
    }
);

export const User = mongoose.model('User', userSchema)