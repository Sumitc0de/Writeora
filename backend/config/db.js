// Import dotenv to load environment variables
require("dotenv").config();
// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB database
// This is an async function that handles the connection logic
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Log success message if connection is established
        console.log("MongoDB connected successfully!")
    } catch (error) {
        // Catch any connection errors and log them
        console.log("Error: ", error);
        
        // Exit the process with error code if connection fails
        process.exit(1);
    }
}

// Export the connectDB function for use in other modules
module.exports = connectDB