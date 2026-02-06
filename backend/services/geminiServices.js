const { model } = require("../config/geminiClient.js");

const callGemini = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048
      }
    });

    return result?.response?.text() || "";
  } catch (err) {
    console.error("Gemini error:", err.message);
    throw new Error("AI generation failed");
  }
};

module.exports = callGemini;
