import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

const LessonSidebar = ({ module, currentLessonSlug }) => {
    return (
        <div className="w-full lg:w-80 bg-[#1A1A1A] border-r border-white/10 h-[calc(100vh-80px)] overflow-y-auto sticky top-20 hidden lg:block">
            <div className="p-6 border-b border-white/10">
                <Link to="/learn" className="text-xs text-gray-500 hover:text-white mb-2 block">
                    &larr; Back to Courses
                </Link>
                <h2 className="text-lg font-bold text-white line-clamp-1" title={module.title}>
                    {module.title}
                </h2>
                <div className="mt-2 w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-[#F5C542] h-1.5 rounded-full w-1/3" />
                </div>
                <p className="text-xs text-gray-500 mt-2">33% Completed</p>
            </div>

            <div className="p-2">
                {module.lessons.map((lesson, idx) => {
                    const isActive = lesson.slug === currentLessonSlug;
                    return (
                        <Link
                            key={lesson.id}
                            to={`/learn/${module.slug}/lesson/${lesson.slug}`}
                            className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${isActive
                                    ? "bg-[#F5C542]/10 border border-[#F5C542]/20"
                                    : "hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${isActive
                                        ? "border-[#F5C542] text-[#F5C542]"
                                        : "border-gray-700 text-gray-700"
                                    }`}
                            >
                                {isActive ? <PlayCircle size={14} /> : <span className="text-xs">{idx + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`text-sm font-medium truncate ${isActive ? "text-[#F5C542]" : "text-gray-300"
                                        }`}
                                >
                                    {lesson.title}
                                </p>
                                <p className="text-[10px] text-gray-500">{lesson.duration}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default LessonSidebar;
