import { PenTool, Sparkles, Brain, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0C0A07] text-white mt-10 px-6 md:px-20 py-16">
      {/* ===== Hero Section ===== */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-gray-400 text-lg leading-relaxed">
          Empowering writers, creators, and learners to transform their ideas into meaningful impact — 
          with the power of <span className="text-yellow-400 font-medium">AI-driven creativity</span>.
        </p>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-yellow-500">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At Writeora, our mission is to make writing and learning smarter, faster, and more enjoyable.
            We believe everyone has a story, an idea, or a perspective worth sharing — and AI should help
            amplify that, not replace it.
          </p>
          <p className="text-gray-400 mt-4">
            From blogs and articles to research and reports, Writeora is your AI companion that helps you
            create, explore, and grow — one word at a time.
          </p>
        </div>
     <div className="bg-[#1A1713] p-8 rounded-2xl border border-[#2A2520] text-center shadow-md">
  <Brain className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
  <h3 className="text-xl font-semibold mb-2">AI that Assists You</h3>
  <p className="text-gray-400">
    Writeora’s AI helps you express ideas clearly and creatively.
  </p>
</div>

      </section>

      {/* ===== What We Offer Section ===== */}
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-yellow-500">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-[#1A1713] rounded-2xl p-8 border border-[#2A2520] hover:border-yellow-500 transition-all duration-300">
            <PenTool className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Create</h3>
            <p className="text-gray-400 text-sm">
           Write short articles and blogs with AI that helps you express clearly and share your knowledge effortlessly.
            </p>
          </div>

          <div className="bg-[#1A1713] rounded-2xl p-8 border border-[#2A2520] hover:border-yellow-500 transition-all duration-300">
            <Sparkles className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Learn</h3>
            <p className="text-gray-400 text-sm">
              Discover curated content, trends, and writing frameworks designed to help you master your craft.
            </p>
          </div>

          <div className="bg-[#1A1713] rounded-2xl p-8 border border-[#2A2520] hover:border-yellow-500 transition-all duration-300">
            <Users className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Grow</h3>
            <p className="text-gray-400 text-sm">
              Build your portfolio, showcase your work, and grow with a community of passionate creators.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Message to Users ===== */}
      <section className="max-w-3xl mx-auto text-center border-t border-[#2A2520] pt-12">
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Writeora isn’t just a tool — it’s a movement for curious thinkers, bold creators, and lifelong learners.  
          Together, we’re redefining how creativity and intelligence work hand in hand.
        </p>
        <h3 className="text-yellow-500 font-semibold text-xl">
          Let’s create something that inspires the world. 🌍
        </h3>
      </section>
    </div>
  );
};

export default About;
