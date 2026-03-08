const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: "10 min",
    },
    videoUrl: {
        type: String,
    },
    resources: [
        {
            title: String,
            url: String,
            type: { type: String, default: 'pdf' },
        }
    ]
});

const moduleSchema = new mongoose.Schema({
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
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    lessons: [lessonSchema],
}, { timestamps: true });

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
