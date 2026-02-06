const buildPrompt = ({ action, content, topic }) => {
  const baseRules = `
You are a professional content writer.
STRICT RULES:
- Preserve valid HTML tags
- Do NOT add markdown
- Do NOT add explanations
- Output ONLY HTML
`;

  const actions = {
    expand: `
Expand the following content with more depth, examples, and clarity.
Improve flow and readability.
`,

    shorten: `
Shorten the following content while keeping all key ideas.
Remove redundancy only.
`,

    grammar: `
Fix grammar, spelling, and sentence structure.
Do NOT change meaning or tone.
`,

    generate: `
Write a well-structured blog article in HTML.
Include:
- Heading structure (h1–h3)
- Short paragraphs
- Bullet points where useful
`
  };

  return `
${baseRules}

${actions[action] || ""}

${content ? `CONTENT:\n${content}` : ""}
${topic ? `TOPIC:\n${topic}` : ""}
`;
};

module.exports = { buildPrompt };
