import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords, schema }) => {
    useEffect(() => {
        // Update Title
        if (title) {
            document.title = `${title} | Writeora`;
        }

        // Update Meta Tags
        const setMeta = (name, content) => {
            if (!content) return;
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = name;
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        setMeta('description', description);
        setMeta('keywords', keywords);

        // Schema Markup
        if (schema) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.type = "application/ld+json";
                document.head.appendChild(script);
            }
            script.text = JSON.stringify(schema);
        }

        // Cleanup function? 
        // Usually not strictly needed for single page apps transition unless we want to clear them, 
        // but React Router usually handles the view change. 
        // Ideally we would revert to default on unmount, but for now we settle for the next page overwriting it.

    }, [title, description, keywords, schema]);
};
