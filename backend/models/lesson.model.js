const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LearnModule",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        content: {
            type: String, // Markdown content
            required: true,
        },
        duration: {
            type: String,
            default: "10 min",
        },
        resources: [
            {
                title: String,
                pdfUrl: String,
            },
        ],
    },
    { timestamps: true }
);

// Prevent duplicate slugs within the same module
lessonSchema.index({ module: 1, slug: 1 }, { unique: true });

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
