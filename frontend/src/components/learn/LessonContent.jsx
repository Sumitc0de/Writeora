import React from "react";
import Markdown from "react-markdown";
import { Calendar, Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const LessonContent = ({ lesson, module }) => {
    if (!lesson) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={lesson.id}
            className="max-w-3xl mx-auto py-10 px-6"
        >
            <div className="mb-8 border-b border-white/10 pb-8">
                <div className="flex items-center gap-2 text-[#F5C542] text-xs font-bold uppercase tracking-widest mb-3">
                    <span>{module.title}</span>
                    <span>•</span>
                    <span>Lesson</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {lesson.title}
                </h1>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{lesson.duration} read</span>
                    </div>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            <article className="prose prose-invert prose-lg max-w-none">
                <Markdown>{lesson.content}</Markdown>
            </article>

            <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                <button className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    Previous Lesson
                </button>
                <button className="px-6 py-3 rounded-lg bg-[#F5C542] text-black font-medium hover:bg-[#F5C542]/90 transition-colors">
                    Mark as Complete & Next &rarr;
                </button>
            </div>
        </motion.div>
    );
};

export default LessonContent;
