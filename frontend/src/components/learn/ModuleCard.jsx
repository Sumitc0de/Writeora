import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

const ModuleCard = ({ module, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F5C542]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5C542]/10"
        >
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-80" />
            </div>

            <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F5C542] transition-colors">
                    {module.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {module.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{module.lessons.length} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>~{module.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} min</span>
                    </div>
                </div>

                <Link
                    to={`/learn/${module.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg group-hover:bg-[#F5C542] group-hover:text-black transition-all w-full justify-center"
                >
                    Start Learning <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ModuleCard;
