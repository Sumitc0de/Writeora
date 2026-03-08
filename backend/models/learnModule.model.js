const mongoose = require("mongoose");

const learnModuleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        level: {
            type: String, // Beginner, Intermediate, Advanced
            default: "Beginner",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const LearnModule = mongoose.model("LearnModule", learnModuleSchema);
module.exports = LearnModule;
