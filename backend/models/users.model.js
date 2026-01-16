require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt =  require("bcrypt")

// creating user model for
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password must required"],
        minlength: 6,
    },
    avatar: {
        public_id: { type: String },
        url: { type: String, default: "" },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    bio: {
        type: String
    },
    wordCountThisMonth: {
        type: Number,
        default: 0,
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts"
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, {
    timestamps: true
})


// password hashing using bcrypt
// before creating user saved hash password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    // password hashing
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Creating matchPassword for comparing the hashedPassword with userPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Checking if User model exists then save to them else create new User model in database
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Exporting the User model
module.exports = User;
