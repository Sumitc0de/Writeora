import React, { useEffect, useState } from "react";
import { getModules, getLesson, createLesson, updateLesson, deleteLesson } from "../../service/learnService";
import { uploadPdf } from "../../service/uploadService";
import { Plus, Edit2, Trash, X, FileText, Upload } from "lucide-react";
import Background from "../../components/Background";
import { Link } from "react-router-dom";

const AdminLessons = () => {
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [lessons, setLessons] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [formData, setFormData] = useState({ title: "", slug: "", content: "", duration: "10 min", resources: [] });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadModules();
    }, []);

    useEffect(() => {
        if (selectedModuleId) {
            const module = modules.find(m => m._id === selectedModuleId);
            if (module) setLessons(module.lessons || []);
        } else {
            setLessons([]);
        }
    }, [selectedModuleId, modules]);

    const loadModules = async () => {
        const data = await getModules();
        setModules(data);
        if (data.length > 0 && !selectedModuleId) setSelectedModuleId(data[0]._id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedModuleId) return alert("Select a module first");

        try {
            const payload = { ...formData, moduleId: selectedModuleId };
            if (currentLesson) {
                await updateLesson(currentLesson._id, payload);
            } else {
                await createLesson(payload);
            }
            setIsEditing(false);
            setCurrentLesson(null);
            setFormData({ title: "", slug: "", content: "", duration: "10 min", resources: [] });
            loadModules(); // Reload to get updated lessons
        } catch (error) {
            alert("Error saving lesson: " + error.message);
        }
    };

    const handleEdit = (lesson) => {
        setCurrentLesson(lesson);
        setFormData({
            title: lesson.title,
            slug: lesson.slug,
            content: lesson.content,
            duration: lesson.duration,
            resources: lesson.resources || []
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this lesson?")) {
            await deleteLesson(id);
            loadModules();
        }
    };

    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await uploadPdf(file);
            const newResource = { title: file.name, pdfUrl: res.url };
            setFormData(prev => ({ ...prev, resources: [...prev.resources, newResource] }));
        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeResource = (index) => {
        setFormData(prev => ({
            ...prev,
            resources: prev.resources.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 lg:px-20 relative">
            <Background />
            <div className="max-w-6xl mx-auto z-10 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Lessons</h1>
                    <Link to="/admin/dashboard" className="text-gray-400 hover:text-white pt-2">Back</Link>
                </div>

                {/* Module Selector */}
                <div className="mb-8">
                    <label className="text-gray-400 block mb-2">Select Module</label>
                    <select
                        className="bg-[#1A1A1A] border border-white/10 p-3 rounded-lg text-white w-full max-w-md"
                        value={selectedModuleId}
                        onChange={(e) => setSelectedModuleId(e.target.value)}
                    >
                        <option value="">-- Select Module --</option>
                        {modules.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                    </select>
                </div>

                {selectedModuleId && !isEditing && (
                    <button
                        onClick={() => { setIsEditing(true); setCurrentLesson(null); setFormData({ title: "", slug: "", content: "", duration: "10 min", resources: [] }); }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
                    >
                        <Plus size={18} /> Add Lesson
                    </button>
                )}

                {isEditing && (
                    <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl mb-8">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">{currentLesson ? "Edit Lesson" : "Create Lesson"}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Lesson Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Duration (e.g. 15 min)" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />

                            {/* PDF Upload */}
                            <div className="md:col-span-2 bg-black/30 p-4 rounded-lg border border-white/5">
                                <label className="block text-sm text-gray-400 mb-2">PDF Resources</label>
                                <div className="flex items-center gap-2 mb-4">
                                    <input type="file" accept="application/pdf" id="pdfUid" className="hidden" onChange={handlePdfUpload} />
                                    <label htmlFor="pdfUid" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2">
                                        <Upload size={14} /> {uploading ? "Uploading..." : "Upload PDF"}
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    {formData.resources.map((res, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-black/50 p-2 rounded border border-white/5">
                                            <div className="flex items-center gap-2 text-sm">
                                                <FileText size={14} className="text-red-400" /> {res.title}
                                            </div>
                                            <button type="button" onClick={() => removeResource(idx)} className="text-red-500 hover:text-red-400"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <textarea className="bg-black/50 border border-white/10 p-3 rounded-lg text-white md:col-span-2 font-mono text-sm" placeholder="# Markdown Content" rows={10} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required />

                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg md:col-span-2">Save Lesson</button>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    {lessons.map(lesson => (
                        <div key={lesson._id} className="bg-[#1A1A1A] border border-white/10 p-4 rounded-xl flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 font-bold">
                                    {lesson.title.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold">{lesson.title}</h3>
                                    <p className="text-xs text-gray-500">{lesson.slug} • {lesson.duration}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(lesson)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(lesson._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash size={18} /></button>
                            </div>
                        </div>
                    ))}
                    {selectedModuleId && lessons.length === 0 && <p className="text-gray-500 text-center py-8">No lessons found in this module.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminLessons;
