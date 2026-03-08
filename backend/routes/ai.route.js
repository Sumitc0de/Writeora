const express = require("express");
const {
  expandContent,
  shortenContent,
  fixGrammar,
  generateContent,
  seoCheck
} = require("../controllers/ai.controller");

const router = express.Router();

router.post("/expand", expandContent);
router.post("/shorten", shortenContent);
router.post("/fix-grammar", fixGrammar);
router.post("/generate", generateContent);
router.post("/seo-check", seoCheck);

module.exports = router;
