import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson, getModuleBySlug } from "../../data/learnData";
import LessonSidebar from "../../components/learn/LessonSidebar";
import LessonContent from "../../components/learn/LessonContent";
import Background from "../../components/Background";
import { useSEO } from "../../hooks/useSEO";

const LessonPage = () => {
    const { moduleName, lessonSlug } = useParams();
    const [module, setModule] = useState(null);
    const [lesson, setLesson] = useState(null);

    useSEO({
        title: lesson ? `${lesson.title} - ${module?.title}` : "Lesson Loading...",
    });

    useEffect(() => {
        const mod = getModuleBySlug(moduleName);
        const les = getLesson(moduleName, lessonSlug);
        setModule(mod);
        setLesson(les);
    }, [moduleName, lessonSlug]);

    if (!module || !lesson) return <div className="bg-[#050505] min-h-screen text-white pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex pt-[72px]">
            <Background />
            {/* Sidebar - Hidden on mobile, sticky on desktop */}
            <LessonSidebar module={module} currentLessonSlug={lesson.slug} />

            {/* Main Content */}
            <div className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-72px)]">
                <LessonContent lesson={lesson} module={module} />
            </div>
        </div>
    );
};

export default LessonPage;
