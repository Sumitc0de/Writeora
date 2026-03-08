const User = require("../models/users.model");

// Give all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User removed" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// Update User Role
exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body; // "admin" or "user"

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: `User role updated to ${role}`, user });
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error: error.message });
    }
};
