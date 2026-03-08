import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModuleBySlug } from "../../data/learnData";
import Background from "../../components/Background";
import { PlayCircle, Clock, ChevronLeft } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const ModulePage = () => {
    const { moduleName } = useParams();
    const [module, setModule] = useState(null);

    useSEO({
        title: module ? `${module.title} - Course` : "Loading Course...",
        description: module?.description,
    });

    useEffect(() => {
        const data = getModuleBySlug(moduleName);
        setModule(data);
    }, [moduleName]);

    if (!module) return <div className="min-h-screen bg-[#050505] pt-24 text-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
            <Background />

            <div className="max-w-4xl mx-auto z-10 relative">
                <Link to="/learn" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ChevronLeft size={20} /> Back to Courses
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
                    <img
                        src={module.image}
                        alt={module.title}
                        className="w-full md:w-64 aspect-video object-cover rounded-xl border border-white/10 shadow-2xl"
                    />
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            {module.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="bg-[#F5C542]/10 text-[#F5C542] px-3 py-1 rounded-full border border-[#F5C542]/20">
                                {module.lessons.length} Lessons
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} /> 2 Hours
                            </span>
                        </div>
                    </div>
                </div>

                {/* Lesson List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                    {module.lessons.map((lesson, idx) => (
                        <Link
                            key={lesson.id}
                            to={`/learn/${module.slug}/lesson/${lesson.slug}`}
                            className="flex items-center justify-between p-5 bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-[#F5C542]/50 hover:bg-[#F5C542]/5 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#F5C542] group-hover:border-[#F5C542] border border-transparent transition-colors font-mono">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white group-hover:text-[#F5C542] transition-colors">{lesson.title}</h3>
                                    <p className="text-xs text-gray-500">Video • {lesson.duration}</p>
                                </div>
                            </div>
                            <PlayCircle className="text-gray-600 group-hover:text-[#F5C542] transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModulePage;
