import mongoose from "mongoose";

const connect = async () => {
    const PORT = process.env.MONGO_ATLAS_URI
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Consider adding other options like reconnectTries, reconnectInterval
        };
        await mongoose.connect(PORT, options);
        console.log("Connected to MongoDB successfully!");
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB connection disconnected!");

        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // Handle connection errors more robustly
        // (e.g., throw an error, exit gracefully with a user-friendly message)
    }
}

export default connect;
