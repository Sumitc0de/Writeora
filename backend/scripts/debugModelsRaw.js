require('dotenv').config();
const axios = require('axios');

async function debugModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log("Fetching models from raw API...");
        const response = await axios.get(url);
        console.log("✅ Success! Available models:");
        response.data.models.forEach(m => {
            console.log(`- ${m.name} (${m.displayName})`);
        });
    } catch (error) {
        console.error("❌ Raw API Error:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Message: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(error.message);
        }
    }
}

debugModels();
