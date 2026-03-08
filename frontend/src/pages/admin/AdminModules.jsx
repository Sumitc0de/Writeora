import React, { useEffect, useState } from "react";
import { getModules, createModule, updateModule, deleteModule } from "../../service/learnService";
import { Plus, Edit2, Trash, X } from "lucide-react";
import Background from "../../components/Background";
import { Link } from "react-router-dom";

const AdminModules = () => {
    const [modules, setModules] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [formData, setFormData] = useState({ title: "", slug: "", description: "", image: "", level: "Beginner" });

    useEffect(() => {
        loadModules();
    }, []);

    const loadModules = async () => {
        const data = await getModules();
        setModules(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentModule) {
                await updateModule(currentModule._id, formData);
            } else {
                await createModule(formData);
            }
            setIsEditing(false);
            setCurrentModule(null);
            setFormData({ title: "", slug: "", description: "", image: "", level: "Beginner" });
            loadModules();
        } catch (error) {
            alert("Error saving module: " + error.message);
        }
    };

    const handleEdit = (module) => {
        setCurrentModule(module);
        setFormData({
            title: module.title,
            slug: module.slug,
            description: module.description,
            image: module.image,
            level: module.level
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this module and all its lessons?")) {
            await deleteModule(id);
            loadModules();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 lg:px-20 relative">
            <Background />
            <div className="max-w-6xl mx-auto z-10 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Modules</h1>
                    <div className="flex gap-4">
                        <Link to="/admin/dashboard" className="text-gray-400 hover:text-white pt-2">Back</Link>
                        <button
                            onClick={() => { setIsEditing(true); setCurrentModule(null); setFormData({ title: "", slug: "", description: "", image: "", level: "Beginner" }); }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus size={18} /> New Module
                        </button>
                    </div>
                </div>

                {isEditing && (
                    <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl mb-8">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">{currentModule ? "Edit Module" : "Create Module"}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Slug (e.g. my-course)" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                            <input className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                            <select className="bg-black/50 border border-white/10 p-3 rounded-lg text-white" value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <textarea className="bg-black/50 border border-white/10 p-3 rounded-lg text-white md:col-span-2" placeholder="Description" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg md:col-span-2">Save Module</button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map(module => (
                        <div key={module._id} className="bg-[#1A1A1A] border border-white/10 p-4 rounded-xl flex flex-col justify-between">
                            <div>
                                <img src={module.image} alt={module.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                                <p className="text-xs text-gray-500 mb-2">/{module.slug}</p>
                                <p className="text-gray-400 text-sm line-clamp-2">{module.description}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/5">
                                <button onClick={() => handleEdit(module)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(module._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminModules;
