import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Trash, FileText, ChevronDown, ChevronRight, Paperclip } from "lucide-react";
import Background from "../../components/Background";
import { learnModules } from "../../data/learnData";

const AdminLearnManager = () => {
    const [modules, setModules] = useState(learnModules);
    const [expandedModule, setExpandedModule] = useState(null);

    const toggleExpand = (id) => {
        setExpandedModule(expandedModule === id ? null : id);
    };

    const handleDeleteModule = (id) => {
        if (confirm("Delete this module?")) {
            setModules(modules.filter(m => m.id !== id));
        }
    };

    const handleDeleteLesson = (moduleId, lessonId) => {
        if (confirm("Delete this lesson?")) {
            const updatedModules = modules.map(m => {
                if (m.id === moduleId) {
                    return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
                }
                return m;
            });
            setModules(updatedModules);
        }
    };

    const handleAddResource = (moduleId, lessonId) => {
        const resourceName = prompt("Enter PDF Name (e.g., Guide.pdf):");
        if (!resourceName) return;

        // Simulations "File Upload"
        const mockUrl = `/files/${resourceName.toLowerCase().replace(/\s+/g, '-')}`;

        const updatedModules = modules.map(m => {
            if (m.id === moduleId) {
                const updatedLessons = m.lessons.map(l => {
                    if (l.id === lessonId) {
                        const newResource = { title: resourceName, url: mockUrl, type: "pdf" };
                        return { ...l, resources: [...(l.resources || []), newResource] };
                    }
                    return l;
                });
                return { ...m, lessons: updatedLessons };
            }
            return m;
        });
        setModules(updatedModules);
        alert(`Resource "${resourceName}" added!`);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 lg:px-20 relative">
            <Background />
            <div className="max-w-6xl mx-auto z-10 relative">
                <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8">
                    <ChevronLeft size={20} /> Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Content Manager</h1>
                    <button className="bg-[#F5C542] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#F5C542]/90 flex items-center gap-2">
                        <Plus size={18} /> Add Module
                    </button>
                </div>

                <div className="space-y-4">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
                            {/* Module Header */}
                            <div
                                className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => toggleExpand(module.id)}
                            >
                                <div className="flex items-center gap-4">
                                    {expandedModule === module.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    <div>
                                        <h3 className="font-bold text-lg">{module.title}</h3>
                                        <p className="text-sm text-gray-500">{module.lessons.length} Lessons</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteModule(module.id); }}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete Module"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Lessons List (Expanded) */}
                            {expandedModule === module.id && (
                                <div className="border-t border-white/10 bg-black/20">
                                    {module.lessons.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500 text-sm">No lessons yet.</div>
                                    ) : (
                                        module.lessons.map((lesson) => (
                                            <div key={lesson.id} className="p-4 border-b border-white/5 last:border-0 pl-12 flex items-center justify-between hover:bg-white/[0.02]">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} className="text-gray-500" />
                                                    <span className="text-sm">{lesson.title}</span>
                                                    {lesson.resources && lesson.resources.length > 0 && (
                                                        <span className="text-[10px] bg-[#F5C542]/10 text-[#F5C542] px-2 py-0.5 rounded-full border border-[#F5C542]/20">
                                                            {lesson.resources.length} PDF(s)
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleAddResource(module.id, lesson.id)}
                                                        className="text-xs flex items-center gap-1 text-[#F5C542] hover:underline px-3 py-1.5 rounded-md hover:bg-[#F5C542]/10 transition-colors"
                                                    >
                                                        <Paperclip size={12} /> Add PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                                        className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div className="p-4 pl-12">
                                        <button className="text-sm text-gray-500 hover:text-white flex items-center gap-2 transition-colors">
                                            <Plus size={14} /> Add New Lesson
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminLearnManager;
