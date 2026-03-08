export const learnModules = [
    {
        id: "m1",
        slug: "prompt-engineering-masterclass",
        title: "Prompt Engineering Masterclass",
        description: "Master the art of talking to AI models for precise, high-quality results.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l1",
                slug: "intro-to-prompting",
                title: "Introduction to Prompting",
                duration: "10 min",
                content: `
# Introduction to Prompting

Prompt engineering is the art of communicating with AI models.

## Key Concepts
- **Clarity**: Be precise in your instructions.
- **Context**: Provide necessary background information.
- **Constraints**: Define the format and limitations of the output.
        `,
                resources: [
                    { title: "Prompting Cheat Sheet.pdf", url: "/files/prompt-guide.pdf", type: "pdf" }
                ]
            },
            {
                id: "l2",
                slug: "zero-shot-vs-few-shot",
                title: "Zero-shot vs Few-shot",
                duration: "15 min",
                content: `
# Zero-shot vs Few-shot Learning

Learn how giving examples can drastically improve AI performance.

- **Zero-shot**: Asking without examples.
- **Few-shot**: Providing 2-3 examples of desired output.
        `,
                resources: []
            }
        ]
    },
    {
        id: "m2",
        slug: "llm-architecture-fundamentals",
        title: "LLM Architecture Fundamentals",
        description: "Understand how Large Language Models actually work under the hood.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l3",
                slug: "transformers-explained",
                title: "Transformers Explained",
                duration: "20 min",
                content: "# Transformers Explained\n\nThe architecture that changed everything...",
                resources: [
                    { title: "Transformer Architecture Diagram.pdf", url: "#", type: "pdf" }
                ]
            }
        ]
    },
    {
        id: "m3",
        slug: "rag-systems-explained",
        title: "RAG Systems Explained",
        description: "Retrieval Augmented Generation for data-driven, accurate writing.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l4",
                slug: "what-is-rag",
                title: "What is RAG?",
                duration: "12 min",
                content: "# What is RAG?\n\nCombining retrieval with generation to reduce hallucinations...",
                resources: []
            }
        ]
    },
    {
        id: "m4",
        slug: "ai-api-integration-guide",
        title: "AI API Integration Guide",
        description: "Build your own custom writing tools using our powerful API.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l5",
                slug: "connecting-to-openai",
                title: "Connecting to OpenAI",
                duration: "25 min",
                content: "# Connecting to OpenAI\n\nStep-by-step guide to using the API...",
                resources: []
            }
        ]
    },
    {
        id: "m5",
        slug: "viral-video-scripting-with-ai",
        title: "Viral Video Scripting with AI",
        description: "Create engaging video scripts with AI assistance for YouTube & TikTok.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l6",
                slug: "hook-generation",
                title: "Generatng Viral Hooks",
                duration: "8 min",
                content: "# Generating Viral Hooks\n\nHow to use AI to grab attention in the first 3 seconds...",
                resources: []
            }
        ]
    },
    {
        id: "m6",
        slug: "modern-storytelling-techniques",
        title: "Modern Storytelling Techniques",
        description: "Classic storytelling principles enhanced by artificial intelligence.",
        image: "https://images.unsplash.com/photo-1478720568477-152d0b3d00cd?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: "l7",
                slug: "heros-journey-ai",
                title: "The Hero's Journey & AI",
                duration: "18 min",
                content: "# The Hero's Journey\n\nApplying Campbell's monomyth with AI assistance...",
                resources: []
            }
        ]
    }
];

export const getModules = () => {
    return learnModules;
};

export const getModuleBySlug = (slug) => {
    return learnModules.find((m) => m.slug === slug);
};

export const getLesson = (moduleSlug, lessonSlug) => {
    const module = getModuleBySlug(moduleSlug);
    if (!module) return null;
    return module.lessons.find((l) => l.slug === lessonSlug);
};
