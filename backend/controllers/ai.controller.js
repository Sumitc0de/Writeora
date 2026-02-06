const callGemini = require("../services/geminiServices.js");
const cleanOutput = require("../utils/cleanOutput.js");
const { buildPrompt } = require("../utils/promptBuilder.js");

const handleAIResponse = async (res, prompt) => {
  const text = await callGemini(prompt);
  res.json({ success: true, result: cleanOutput(text) });
};

exports.expandContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const aiPrompt = buildPrompt({ action: "expand", content });
    await handleAIResponse(res, aiPrompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.shortenContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const aiPrompt = buildPrompt({ action: "shorten", content });
    await handleAIResponse(res, aiPrompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fixGrammar = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const aiPrompt = buildPrompt({ action: "grammar", content });
    await handleAIResponse(res, aiPrompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateContent = async (req, res) => {
  try {
    const { prompt: topic } = req.body;
    if (!topic) return res.status(400).json({ message: "Prompt required" });

    const aiPrompt = buildPrompt({ action: "generate", topic });
    await handleAIResponse(res, aiPrompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
