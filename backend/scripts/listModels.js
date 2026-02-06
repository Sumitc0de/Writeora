require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.error("❌ Invalid API Key. Please update your .env file.");
            return;
        }

        console.log(`Using API Key starting with: ${apiKey.substring(0, 5)}...`);

        const genAI = new GoogleGenerativeAI(apiKey);

        // Test a basic call
        try {
            const models = await genAI.listModels();
            console.log("✅ Models listed successfully!");
            models.models.forEach(model => {
                if (model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${model.name}`);
                }
            });
        } catch (listError) {
            console.error("❌ Failed to list models. Error details:");
            console.error(listError);
        }

    } catch (error) {
        console.error("❌ Top level error:", error.message);
    }
}

listModels();
