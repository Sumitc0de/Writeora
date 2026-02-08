import { api } from "../service/api.js";
const handleRequest = async (req) => {
  try {
    const res = await req;
    return res.data.result;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Something went wrong");
  }
};

export const expandContent = (content) =>
  handleRequest(api.post("/api/ai/expand", { content }));

export const shortenContent = (content) =>
  handleRequest(api.post("/api/ai/shorten", { content }));

export const checkSEO = (content) =>
  handleRequest(api.post("/api/ai/seo-check", { content }));

export const fixGrammar = (content) =>
  handleRequest(api.post("/api/ai/fix-grammar", { content }));

export const generateContent = (prompt, template = "blog") =>
  handleRequest(api.post("/api/ai/generate", { prompt, template }));
