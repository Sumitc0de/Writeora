import React from "react";

/* Footer link data */
const footerData = [
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Community", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.05] text-white px-6 sm:px-10 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND + SUBSCRIBE */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Writeora
              </h3>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                The intelligent platform for modern creators. Write, learn, and grow with AI-powered tools designed for the future.
              </p>
            </div>

            <div className="p-1 bg-white/[0.05] rounded-xl border border-white/[0.05] flex flex-col sm:flex-row w-full max-w-md gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-none text-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-0 w-full"
              />
              <button
                type="button"
                className="px-6 py-2.5 bg-[#F5C542] text-black text-sm font-semibold rounded-lg hover:bg-[#ffda6b] transition-colors w-full sm:w-auto"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* LINK COLUMNS */}
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[#F5C542] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="my-12 w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Writeora Inc. All rights reserved.
          </p>

          <div className="flex justify-center sm:justify-end gap-6">
            <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Twitter</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.254 5.92c-.621.275-1.285.46-1.983.543.714-.429 1.259-1.109 1.517-1.917-.665.394-1.403.682-2.188.837-.628-.67-1.52-1.088-2.518-1.088-1.905 0-3.454 1.549-3.454 3.454 0 .27.03.535.087.79-2.87-1.44-5.414-3.04-7.143-5.385-.3.515-.474 1.11-.474 1.741 0 1.197.608 2.253 1.534 2.879-.566-.017-1.127-.174-1.603-.437v.043c0 1.678 1.195 3.085 2.784 3.402-.29.08-.598.125-.913.125-.224 0-.442-.022-.655-.062.441 1.385 1.725 2.392 3.243 2.624-1.187.932-2.684 1.49-4.316 1.49-.28 0-.55-.015-.818-.047 1.534.981 3.355 1.558 5.316 1.558 6.37 0 9.875-5.289 9.875-9.875 0-.15-.003-.3-.008-.448.674-.486 1.258-1.096 1.718-1.802z" /></svg></a>
            <a href="#" className="hover:text-white transition-colors"><span className="sr-only">LinkedIn</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.27 20.91H3.66V9h3.61v11.91zM5.46 7.64c-1.2 0-2.17-.97-2.17-2.17 0-1.2.97-2.17 2.17-2.17 1.2 0 2.17.97 2.17 2.17 0 1.2-.97 2.17-2.17 2.17zM20.34 20.91h-3.6V15.2c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.81h-3.6V9h3.46v1.59h.05c.48-.91 1.66-1.87 3.4-1.87 3.64 0 4.31 2.39 4.31 5.5v5.69h-.01z" /></svg></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
