import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

function ScrollToTopButton() {

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };



    return (
        <div >{showScrollTop && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
           bg-yellow-500 text-black shadow-lg
           transition-all duration-300
           hover:bg-yellow-600
           animate-fade-in"

            >
                <ArrowUp size={20} />
            </button>
        )}
        </div>
    )
}

export default ScrollToTopButton