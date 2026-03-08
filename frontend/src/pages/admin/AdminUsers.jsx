import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole } from "../../service/adminService";
import { Trash, Shield, ShieldOff, User } from "lucide-react";
import Background from "../../components/Background";
import { Link } from "react-router-dom";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            fetchUsers();
        }
    };

    const handleRoleUpdate = async (id, currentRole) => {
        const newRole = currentRole === "admin" ? "user" : "admin";
        if (confirm(`Change role to ${newRole}?`)) {
            await updateUserRole(id, newRole);
            fetchUsers();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 px-6 lg:px-20 relative">
            <Background />
            <div className="max-w-6xl mx-auto z-10 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <Link to="/admin/dashboard" className="text-gray-400 hover:text-white">Back to Dashboard</Link>
                </div>

                <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t border-white/5 hover:bg-white/[0.02]">
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                            {user.avatar?.url ? <img src={user.avatar.url} alt={user.name} /> : <User size={16} />}
                                        </div>
                                        {user.name}
                                    </td>
                                    <td className="p-4 text-gray-400">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700/50 text-gray-400'}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleRoleUpdate(user._id, user.role)}
                                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg mr-2"
                                            title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                        >
                                            {user.role === 'admin' ? <ShieldOff size={18} /> : <Shield size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                                            title="Delete User"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
