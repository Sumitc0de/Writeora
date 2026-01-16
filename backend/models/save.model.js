const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    }

}, { timestamps: true })


// Prevent to do not duplicate
saveSchema.index({ user: 1, post: 1 }, { unique: true });


const Saves = mongoose.models.Saves || mongoose.model("Saves", saveSchema);
module.exports = Saves
