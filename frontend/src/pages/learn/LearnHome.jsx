import React, { useState, useEffect } from "react";
import { getModules } from "../../data/learnData";
import ModuleCard from "../../components/learn/ModuleCard";
import Background from "../../components/Background";
import { useSEO } from "../../hooks/useSEO";

const LearnHome = () => {
    const [modules, setModules] = useState([]);

    useSEO({
        title: "Learn AI & Development - Free Courses",
        description: "Browse our free courses on AI tools, prompt engineering, and modern web development.",
        keywords: "free ai courses, learn programming, web development tutorials, prompt engineering guide",
    });

    useEffect(() => {
        setModules(getModules());
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
            <Background />

            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Start <span className="text-[#F5C542]">Learning</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Master new skills with our structured learning modules.
                        From AI fundamentals to advanced coding techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module, index) => (
                        <ModuleCard key={module.id} module={module} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnHome;
