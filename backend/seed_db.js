const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const LearnModule = require("./models/learnModule.model");
const Lesson = require("./models/lesson.model");
const User = require("./models/users.model");

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);
    }
};

const seedDB = async () => {
    await connectDB();

    try {
        // Clear existing modules/lessons
        await LearnModule.deleteMany({});
        await Lesson.deleteMany({});
        console.log("Cleared existing modules and lessons");

        // Find an admin user or create a dummy one
        const adminUser = await User.findOne({ role: "admin" }) || await User.findOne({});
        if (!adminUser) {
            console.log("No user found to assign as creator. Skipping.");
            process.exit();
        }

        // --- Module 1 ---
        const module1 = await LearnModule.create({
            title: "Prompt Engineering Masterclass",
            slug: "prompt-engineering-masterclass",
            description: "Master the art of talking to AI models.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
            level: "Beginner",
            createdBy: adminUser._id
        });

        await Lesson.create([
            {
                module: module1._id,
                title: "Introduction to Prompting",
                slug: "intro-to-prompting",
                duration: "10 min",
                content: "# Introduction to Prompting\n\nPrompt engineering is the art of communicating with AI models.",
                resources: [{ title: "Prompting Cheat Sheet.pdf", pdfUrl: "/files/prompt-guide.pdf" }]
            },
            {
                module: module1._id,
                title: "Zero-shot vs Few-shot",
                slug: "zero-shot-vs-few-shot",
                duration: "15 min",
                content: "# Zero-shot vs Few-shot\n\nLearn how giving examples works."
            }
        ]);

        // --- Module 2 ---
        const module2 = await LearnModule.create({
            title: "LLM Architecture Fundamentals",
            slug: "llm-architecture-fundamentals",
            description: "Understand how LLMs work.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
            level: "Intermediate",
            createdBy: adminUser._id
        });

        await Lesson.create({
            module: module2._id,
            title: "Transformers Explained",
            slug: "transformers-explained",
            duration: "20 min",
            content: "# Transformers Explained\n\nThe architecture that changed everything..."
        });

        console.log("✅ Database Seeded Successfully with New Structure!");
        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
};

seedDB();
