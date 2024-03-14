import mongoose from 'mongoose';

const todoSchema= new mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    status:{
        type: String,
        optional: true,
        default: 'to-do',
        enum: ['to-do', 'in progress', 'done']
    },

    title:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
    },

}, {
    timestamps: true
});


export const todoModel= mongoose.model('Todo', todoSchema);