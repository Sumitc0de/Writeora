import React from "react";
import { Mail, MapPin, Clock, Send, Twitter, Linkedin, Youtube, ArrowRight, MessageSquare } from "lucide-react";
import Background from "../src/components/Background";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6 lg:px-20 relative overflow-hidden">
      <Background />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">

        {/* ===== Contact Form ===== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <MessageSquare size={14} className="text-[#F5C542]" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Get In Touch</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's <span className="text-[#F5C542]">Collaborate</span></h1>
          <p className="text-gray-400 mb-10 text-lg">
            Have a question or just want to explore how Writeora can help your team? Drop us a line.
          </p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white/[0.03] w-full p-4 rounded-xl text-white placeholder-gray-500 border border-white/10 focus:border-[#F5C542]/50 focus:bg-white/[0.05] outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/[0.03] w-full p-4 rounded-xl text-white placeholder-gray-500 border border-white/10 focus:border-[#F5C542]/50 focus:bg-white/[0.05] outline-none transition-all"
              />
            </div>
            <textarea
              placeholder="How can we help you?"
              rows="6"
              className="bg-white/[0.03] w-full p-4 rounded-xl text-white placeholder-gray-500 border border-white/10 focus:border-[#F5C542]/50 focus:bg-white/[0.05] outline-none transition-all"
            ></textarea>

            <button
              type="submit"
              className="group w-full bg-[#F5C542] text-black font-bold text-lg py-4 rounded-xl hover:shadow-[0_0_30px_rgba(245,197,66,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* ===== Contact Info ===== */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-10 md:pl-10"
        >
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">Contact Info</h2>
            <div className="space-y-6 text-gray-300">
              <ContactItem icon={<Mail />} text="support@writeora.ai" label="Email Us" />
              <ContactItem icon={<MapPin />} text="Writeora Technologies, 22B Creative Hub Street, Mumbai, India" label="Visit Us" />
              <ContactItem icon={<Clock />} text="Monday - Friday, 9:00 AM - 7:00 PM" label="Working Hours" />
            </div>
          </div>

          {/* ===== Social Links ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white ml-2">Follow Our Journey</h3>
            <div className="flex items-center gap-4">
              <SocialBtn icon={<Twitter />} />
              <SocialBtn icon={<Linkedin />} />
              <SocialBtn icon={<Youtube />} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, text, label }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-10 h-10 rounded-lg bg-[#F5C542]/10 flex items-center justify-center text-[#F5C542] shrink-0 group-hover:bg-[#F5C542] group-hover:text-black transition-colors">
      {icon}
    </div>
    <div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{text}</div>
    </div>
  </div>
);

const SocialBtn = ({ icon }) => (
  <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#F5C542]/50 transition-all">
    {icon}
  </a>
);

export default ContactPage;
