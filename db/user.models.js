import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema= new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },

    password:{
        type: String,
        required: true,
    },

    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
    },

    lastName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-z]{3,8}(@)(gmail|yahoo|outlook)(.com)/.test(value);
              },
              message: () => `invalid email address`
        }
    },

    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
    }

}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    let salt= await bcrypt.genSalt(10);
    let hashedPassword= await bcrypt.hash(this.password, salt);
    this.password= hashedPassword;
    next();
})

export const userModel= mongoose.model('User', userSchema);