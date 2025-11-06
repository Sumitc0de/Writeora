import { Mail, MapPin, Clock, Send, Twitter, Linkedin, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-[90vh] bg-[#0C0A07] text-white py-16 px-6 mt-20 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* ===== Contact Form ===== */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-yellow-500">Get in Touch</h1>
          <p className="text-gray-400 mb-8">We’d love to hear from you. Whether you have a question or just want to say hi — our team is here.</p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-[#1A1713] w-full p-3 rounded-xl text-gray-200 placeholder-gray-500 border border-[#2A2520] focus:border-yellow-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#1A1713] w-full p-3 rounded-xl text-gray-200 placeholder-gray-500 border border-[#2A2520] focus:border-yellow-500 outline-none"
              />
            </div>
            <textarea
              placeholder="Message"
              rows="6"
              className="bg-[#1A1713] w-full p-3 rounded-xl text-gray-200 placeholder-gray-500 border border-[#2A2520] focus:border-yellow-500 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-yellow-600 to-yellow-400 text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-yellow-600/40"
            >
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

        {/* ===== Contact Info ===== */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-yellow-500">Contact Info</h2>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3"><Mail className="text-yellow-500 w-5 h-5" /> support@writeora.ai</p>
              <p className="flex items-start gap-3">
                <MapPin className="text-yellow-500 w-5 h-5 mt-1" />
                Writeora Technologies, 22B Creative Hub Street, Mumbai, India
              </p>
              <p className="flex items-center gap-3"><Clock className="text-yellow-500 w-5 h-5" /> Monday - Friday, 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* ===== Social Links ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Follow Us</h3>
            <div className="flex items-center gap-5">
              <a href="#" className="p-3 bg-[#1A1713] rounded-full hover:bg-yellow-600/20 transition"><Twitter /></a>
              <a href="#" className="p-3 bg-[#1A1713] rounded-full hover:bg-yellow-600/20 transition"><Linkedin /></a>
              <a href="#" className="p-3 bg-[#1A1713] rounded-full hover:bg-yellow-600/20 transition"><Youtube /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
