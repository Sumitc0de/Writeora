const LearnModule = require("../models/learnModule.model");
const Lesson = require("../models/lesson.model");

// --- Public ---

// Get all modules (without lessons content)
exports.getAllModules = async (req, res) => {
    try {
        const modules = await LearnModule.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching modules", error: error.message });
    }
};

// Get single module by slug (with lessons list)
exports.getModuleBySlug = async (req, res) => {
    try {
        const module = await LearnModule.findOne({ slug: req.params.slug }).populate("createdBy", "name");
        if (!module) return res.status(404).json({ message: "Module not found" });

        const lessons = await Lesson.find({ module: module._id }).select("title slug duration");

        // Combine for response
        const result = module.toObject();
        result.lessons = lessons;

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching module", error: error.message });
    }
};

// Get single lesson details
exports.getLesson = async (req, res) => {
    try {
        const { moduleSlug, lessonSlug } = req.params;

        const module = await LearnModule.findOne({ slug: moduleSlug });
        if (!module) return res.status(404).json({ message: "Module not found" });

        const lesson = await Lesson.findOne({ module: module._id, slug: lessonSlug });
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: "Error fetching lesson", error: error.message });
    }
}

// --- Admin Only ---

// Create Module
exports.createModule = async (req, res) => {
    try {
        const { title, slug, description, image, level } = req.body;

        const newModule = new LearnModule({
            title,
            slug,
            description,
            image,
            level,
            createdBy: req.user._id
        });

        await newModule.save();
        res.status(201).json(newModule);
    } catch (error) {
        res.status(500).json({ message: "Error creating module", error: error.message });
    }
};

// Update Module
exports.updateModule = async (req, res) => {
    try {
        const module = await LearnModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ message: "Error updating module", error: error.message });
    }
}

// Delete Module
exports.deleteModule = async (req, res) => {
    try {
        const module = await LearnModule.findById(req.params.id);
        if (!module) return res.status(404).json({ message: "Module not found" });

        // Delete associated lessons
        await Lesson.deleteMany({ module: module._id });
        await module.deleteOne();

        res.status(200).json({ message: "Module and lessons deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting module", error: error.message });
    }
};

// Create Lesson
exports.createLesson = async (req, res) => {
    try {
        const { moduleId, title, slug, content, duration, resources } = req.body;

        const newLesson = new Lesson({
            module: moduleId,
            title,
            slug,
            content,
            duration,
            resources
        });

        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(500).json({ message: "Error creating lesson", error: error.message });
    }
}

// Update Lesson
exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ message: "Error updating lesson", error: error.message });
    }
}

// Delete Lesson
exports.deleteLesson = async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Lesson deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting lesson", error: error.message });
    }
}
