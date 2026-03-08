import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../service/adminService";
import { getModules } from "../../service/learnService";
import { Users, BookOpen, Layers } from "lucide-react";
import Background from "../../components/Background";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, link, linkText }) => (
    <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-4xl font-bold text-white mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                <Icon size={24} />
            </div>
        </div>
        {link && (
            <Link to={link} className={`text-${color}-400 text-sm hover:underline mt-4 inline-block`}>
                {linkText} &rarr;
            </Link>
        )}
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, modules: 0, lessons: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const users = await getAllUsers();
                const modules = await getModules();
                // Calculate total lessons across all modules
                const lessonCount = modules.reduce((acc, curr) =>
                    acc + (curr.lessons ? curr.lessons.length : 0), 0);

                setStats({
                    users: users.length,
                    modules: modules.length,
                    lessons: lessonCount
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 lg:px-20 relative">
            <Background />
            <div className="max-w-6xl mx-auto z-10 relative">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-gray-400 mb-8">Overview of your platform's performance.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Users"
                        value={stats.users}
                        icon={Users}
                        color="blue"
                        link="/admin/users"
                        linkText="Manage Users"
                    />
                    <StatCard
                        title="Learning Modules"
                        value={stats.modules}
                        icon={BookOpen}
                        color="purple"
                        link="/admin/learn/modules"
                        linkText="Manage Modules"
                    />
                    <StatCard
                        title="Total Lessons"
                        value={stats.lessons}
                        icon={Layers}
                        color="green"
                        link="/admin/learn/lessons"
                        linkText="Manage Lessons"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
